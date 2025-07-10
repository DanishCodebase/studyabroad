<?php
// Handle preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $allowed_origins = [
        'https://www.nocolleges.com',
        'https://nocolleges.com'
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400'); // Cache preflight for 1 day
    http_response_code(204); // No Content for OPTIONS
    exit();
}

// Set headers for the actual request
$allowed_origins = [
    'https://www.nocolleges.com',
    'https://nocolleges.com'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $inputJSON = file_get_contents('php://input');
        $formData = json_decode($inputJSON, true);

        // Check if JSON decoding was successful
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("Invalid JSON received on submit.php: " . json_last_error_msg());
            throw new Exception("Invalid request format received.");
        }

        error_log("Received data on submit.php: " . print_r($formData, true));

        // Basic validation of required fields from the original form submission
        $required_fields = ['name', 'email', 'phone', 'city', 'educationlevel', 'languagetest'];
        $missing_fields = [];
        foreach ($required_fields as $field) {
            if (empty($formData[$field])) {
                $missing_fields[] = $field;
            }
        }

        if (!empty($missing_fields)) {
            http_response_code(400); // Bad Request
            echo json_encode(['success' => false, 'message' => 'Missing required fields: ' . implode(', ', $missing_fields)]);
            exit;
        }

        if (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400); // Bad Request
            echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
            exit;
        }

        $phoneNumber = trim($formData['phone']);
        if (!preg_match('/^[6-9][0-9]{9}$/', $phoneNumber)) {
            http_response_code(400); // Bad Request
            echo json_encode(['success' => false, 'message' => 'Invalid phone number format. Must be 10 digits starting with 6, 7, 8, or 9.']);
            exit;
        }

        // --- Unified Google Apps Script URL ---
        $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzOApjzVH1PX7nwxppmc7wjBrwb9NuqjURF7cjS8xIorGUc1aPmspOJjVMZX0miRzqs6Q/exec';

        // Basic check to ensure the URL isn't an obvious placeholder
        if (empty($googleScriptUrl) || strpos(strtolower($googleScriptUrl), 'akfyc') === false) {
            error_log("CRITICAL: Google Apps Script URL is not configured or looks invalid in submit.php. Value: [" . $googleScriptUrl . "]");
            throw new Exception("Server configuration error: Script service endpoint is not correctly configured.");
        }

        // --- Stage 1: Check for duplicate phone number ---
        $checkPayload = json_encode([
            'action' => 'checkPhone',
            'phone' => $phoneNumber
        ]);

        error_log("Calling Google Script for 'checkPhone'. URL: [" . $googleScriptUrl . "] Payload: " . $checkPayload);

        $curlResponseCheck = callGoogleAppsScript($googleScriptUrl, $checkPayload, 15);

        if (!$curlResponseCheck['success']) {
            throw new Exception($curlResponseCheck['message']);
        }

        $checkResult = $curlResponseCheck['decoded_response'];
        error_log("'checkPhone' script response: " . print_r($checkResult, true));

        if (isset($checkResult['error']) && !is_null($checkResult['error'])) {
            throw new Exception("Error during phone verification: " . $checkResult['error']);
        }
        if (!isset($checkResult['isDuplicate'])) {
            throw new Exception("Could not determine phone status from verification response (missing 'isDuplicate' key).");
        }

        if ($checkResult['isDuplicate'] === true) {
            error_log("Duplicate phone number identified by 'checkPhone' action: " . $phoneNumber);
            echo json_encode([
                'success' => false,
                'isDuplicate' => true,
                'message' => 'This phone number has already been used to submit an inquiry.'
            ]);
            exit;
        }
        // --- End of Stage 1 ---

        // --- Stage 2: If not a duplicate, proceed to write data ---

        // The original $formData already contains all necessary fields. We just add the action.
        $writeDataPayload = $formData;
        $writeDataPayload['action'] = 'writeData';

        error_log("No duplicate found. Calling Google Script for 'writeData'. URL: [" . $googleScriptUrl . "] Payload: " . json_encode($writeDataPayload));

        $curlResponseWrite = callGoogleAppsScript($googleScriptUrl, json_encode($writeDataPayload), 20);

        if (!$curlResponseWrite['success']) {
            throw new Exception($curlResponseWrite['message']);
        }

        $writeResult = $curlResponseWrite['decoded_response'];
        error_log("'writeData' script response: " . print_r($writeResult, true));

        if (!isset($writeResult['success'])) {
            throw new Exception("Could not determine submission status from write response (missing 'success' key).");
        }

        if ($writeResult['success'] === true) {
            echo json_encode([
                'success' => true,
                'message' => $writeResult['message'] ?? 'Form submitted successfully.'
            ]);
        } else {
            throw new Exception($writeResult['message'] ?? "Data submission failed due to an unspecified script error.");
        }

    } catch (Exception $e) {
        error_log("Exception in submit.php: " . $e->getMessage());
        if (http_response_code() === 200) {
            http_response_code(500);
        }
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
}

/**
 * Helper function to call Google Apps Script.
 */
function callGoogleAppsScript($url, $payload, $timeout)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    $logIdentifier = isset(json_decode($payload, true)['action']) ? json_decode($payload, true)['action'] : 'unknown_action';

    if ($curlError) {
        error_log("Curl error during '{$logIdentifier}' to (" . $url . "): " . $curlError);
        return ['success' => false, 'decoded_response' => null, 'message' => "Network error communicating with script service ({$logIdentifier})."];
    }

    error_log("Raw response from '{$logIdentifier}' (HTTP {$httpCode}): " . $response);

    if ($httpCode !== 200) {
        return ['success' => false, 'decoded_response' => null, 'message' => "Script service ({$logIdentifier}) returned HTTP {$httpCode}."];
    }

    $decodedResponse = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("Invalid JSON response from '{$logIdentifier}' (" . $url . "): " . $response . " | JSON Error: " . json_last_error_msg());
        return ['success' => false, 'decoded_response' => null, 'message' => "Invalid response format from script service ({$logIdentifier})."];
    }

    return ['success' => true, 'decoded_response' => $decodedResponse, 'message' => 'Successfully called script.'];
}
?>