import React from "react";
import { Layout, Button, Checkbox, Form, Input } from "antd";
import { loginApi } from "../api/auth"; 


const {Header, Content, Footer} = Layout

const LoginPage = () => {
    const onFinish = async (e) => {
        console.log(e)
        const res = await loginApi({id: e.id, password: e.password})
        if (res.status >= 400 ){
            alert('로그인에 실패하였습니다. 정보를 확인해주세요.')
            return
        }
        if (e.remember){
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
        } else {
            sessionStorage.setItem('access', res.data.access)
            sessionStorage.setItem('refresh', res.data.refresh)
        }
        window.location.relaod()
    }

    const onFinishFailed = () => {}

    return (
        <Layout style={{display:'flex', height: '100vh'}}>
            <Content style={{display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <h1>쉴만한교회 회계</h1>
                <Form 
                    style={{maxWidth: 500, width: '100%'}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    >
                    <Form.Item
                        label='ID'
                        name='id'
                        rules={[{ required: true, message: 'ID를 입력해주세요.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='PASSWORD'
                        name='password'
                        rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}

                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}
                    >
                        <Checkbox>자동로그인</Checkbox>
                    </Form.Item>
                    <Form.Item 
                        style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}
                    
                    >
                        <Button type="primary" htmlType="submit">
                            로그인
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    )
}
export default LoginPage