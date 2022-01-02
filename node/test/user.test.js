const request = require("supertest")
const app = require("../app.js")
// 이문서는 test 폴더에 있는 testuser.js를 참고해 만든것입니다.

// describe 에는 테스트 할 내용을 작성한다.
describe('User API 테스트', () => {
    // 테스트할 기능을 적는다.
    it('유저 등록 테스트', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                firstName: 'Bob',
                lastName: 'Doe',
                email: 'bob@doe.com',
                password: '12345678'
            })
    // 상태 코드가 201과 같을걸로 예상
        expect(res.statusCode).toEqual(201)
    // body안에 user라는 프로터티가 있을걸로 판단 
        expect(res.body).toHaveProperty('user')
    }),
    it('should show a user', async () => {
        const res = await request(app).get('/api/users/3')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
    }),
    it('should show all users', async () => {
        const res = await request(app).get('/api/users')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('users')
    }),
    it('should update a user', async () => {
        const res = await request(app)
            .put('/api/users/3')
            .send({
                firstName: 'Bob',
                lastName: 'Smith',
                email: 'bob@doe.com',
                password: 'abc123'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
    }),
    it('should delete a user', async () => {
        const res = await request(app)
            .del('/api/users/3')
        expect(res.statusCode).toEqual(204)
    })
})