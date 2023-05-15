import requests

headers = {
    'clientId': 'test1234',
    'clientSecret': 'test1234',
    'Content-Type': 'application/json',
}

json_data = {
    'uid': 'cdb8bd8be35a401baa8a97fabf9355ee',
}

response = requests.post('https://otpless.authlink.me', headers=headers, json=json_data)
print(response.text)