const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

// JSON 요청 본문을 파싱하기 위한 미들웨어
app.use(bodyParser.json());

// Webhook 엔드포인트
app.post('/webhook', (req, res) => {
    const payload = req.body;

    // Merge Request 이벤트인지 확인
    if (payload.object_kind !== 'merge_request') {
        return res.status(400).json({ error: 'Not a Merge Request event' });
    }

    const mr_id = payload.object_attributes.id;
    const project_id = payload.project.id;
    const action = payload.object_attributes.action;

    // 원하는 작업 수행
    switch (action) {
        case 'open':
            console.log(`Merge Request #${mr_id} has been opened.`);
            break;
        case 'update':
            console.log(`Merge Request #${mr_id} has been updated.`);
            break;
        case 'merge':
            console.log(`Merge Request #${mr_id} has been merged.`);
            break;
        default:
            console.log(`Unhandled action: ${action}`);
    }

    return res.json({ status: 'success' });
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
