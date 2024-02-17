import { Modal, Table, Space, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import {getDeletedHistories, recoverHistory, destroyHistory} from '../api/history'


const RecoverModal = ({open, setOpen, recoverAction}) => {
    const [data, setData] = useState([])

    const getHistories = async () => {
        let res = await getDeletedHistories();
        if (!res){
            return alert('삭제 항목을 가져오는 중 에러발생');
        }
        setData(res.data)
    } 

    useEffect(()=>{
        (async ()=> {
            await getHistories()
        })();
    }, [])

    return (
        <Modal 
            open={open}
            onCancel={()=>{setOpen(false)}}
            onOk={()=>{setOpen(false)}}
            footer={[
                <Button key="submit" type='primary' onClick={()=>setOpen(false)}>확인</Button>
            ]}
            >   
            <Table dataSource={data} style={{margin : '1rem auto'}} pagination={false}>
                <Table.Column title='일자' dataIndex={'date'} key='date' />
                <Table.Column title='종류' dataIndex={'category'} key='category' />
                <Table.Column title='이름' dataIndex={'name'} key='name' />
                <Table.Column title='금액' dataIndex={'amount'} key='amount' />
                <Table.Column title='복구' key='action' render={(_, item)=>(
                    <Space size='middle'>
                        <Button onClick={async()=>{
                            let res = await recoverHistory(item.id)
                            if (!res){
                                return alert('복구 하는 중 에러발생')
                            }
                            await getHistories()
                            recoverAction()
                            }}>복구</Button>
                    </Space>
                )}
                />
                <Table.Column title='삭제' key='action' render={(_, item)=>(
                    <Space size='middle'>
                        <Button onClick={async()=>{
                            let res = await destroyHistory(item.id)
                            if (!res){
                                return alert('삭제 하는 중 에러발생')
                            }
                            await getHistories()
                            recoverAction()
                            }}>삭제</Button>
                    </Space>
                )}
                />
            </Table>
        </Modal>
    )
}

export default RecoverModal