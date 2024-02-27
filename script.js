// OpenAI API 키를 여기에 입력하세요. 실제 배포 시에는 이 키를 안전하게 관리해야 합니다.
const API_KEY = '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';

document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    const chat = document.getElementById('chat');

    // 사용자 메시지를 채팅에 추가
    const userMessage = document.createElement('div');
    userMessage.textContent = `작가: ${userInput}`;
    chat.appendChild(userMessage);

    // OpenAI GPT-4 turbo 모델 API 호출
    fetch('https://api.openai.com/v1/engines/gpt-4-turbo/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}` // 발급받은 API 키를 사용하세요.
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        // OpenAI API의 응답을 채팅에 추가
        const assistantResponse = document.createElement('div');
        assistantResponse.textContent = `어시스턴트: ${data.choices[0].text}`;
        chat.appendChild(assistantResponse);
    })
    .catch(error => {
        // 오류 처리
        const errorMessage = document.createElement('div');
        errorMessage.textContent = `어시스턴트: 오류가 발생했습니다.`; // 오류 발생 시 메시지
        chat.appendChild(errorMessage);
    });

    // 입력 필드 초기화
    document.getElementById('userInput').value = '';
});
