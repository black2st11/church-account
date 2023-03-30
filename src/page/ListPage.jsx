import React, { useState } from 'react'
import {Layout, Button, Modal, DatePicker, Space, Table} from 'antd'
import dayjs from 'dayjs'

const {Header, Content, Footer} = Layout;

const getToday = () => {
    return new Date().toISOString().substring(0, 10);
}

const ListPage = () => {
    const [date, setDate] = useState(getToday())
    const [dateModal, setDateModal] = useState(false)
    const [exportModal, setExportModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    console.log(date)

    

    return (
        <Layout className='layout'>
            <Header>
                <Button style={{marginRight: '1rem'}} onClick={()=>{setDateModal(true)}}>조회</Button>
                <Button onClick={()=>setExportModal(true)}>출력</Button>
            </Header>
            <Content>
                <Table></Table>
            </Content>
            <Footer>
                footer
            </Footer>
            <Modal 
                open={dateModal} 
                footer={[
                    <Button key="submit" type='primary' onClick={()=>setDateModal(false)}>확인</Button>
                ]}
                onOk={()=>{setDateModal(false)}}
                onCancel={()=>{setDateModal(false)}}
                title='날짜 설정'
                width={300}
                >
                <DatePicker 
                    value={date ? dayjs(date) : dayjs(getToday()) } 
                    onChange={(_, dateString)=>setDate(dateString)} 
                    />
            </Modal>
            <Modal
                open={exportModal}
                title='출력'
                footer={[
                    <Button key="submit" type='primary' onClick={()=>setExportModal(false)}>나가기</Button>
                ]}
                onOk={()=>{setExportModal(false)}}
                onCancel={()=>{setExportModal(false)}}
            >
                <Space size={'large'}>
                    <Button>엑셀 출력</Button>
                    <Button>엑셀 출력</Button>
                    <Button>엑셀 출력</Button>
                    <Button>엑셀 출력</Button>
                </Space>
            </Modal>
        </Layout>
    )
}

export default ListPage;