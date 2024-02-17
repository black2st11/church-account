import React from 'react'
import {Modal, Space, Button} from 'antd'
import settings from '../settings'
import { getFile } from '../api/history'

const ExportModal = ({open, setOpen, exports }) => {
    const clickFunc = async (url) => {
        let res = await getFile(url)
        if (res.data.url == '/'){
            alert('파일을 가져오는 데 실패하였습니다.')
        }
        if (res.status == 202){
            return alert('해당하는 날짜에 데이터가 존재하지 않습니다.')
        }
        window.location = res.data.url
    }

    return (
        <Modal
            open={open}
            title='출력'
            footer={[
                <Button key="submit" type='primary' onClick={()=>setOpen(false)}>나가기</Button>
            ]}
            onOk={()=>{setOpen(false)}}
            onCancel={()=>{setOpen(false)}}
        >
            <Space size={'large'} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem auto'}}>
                {exports.map((item,index)=>(
                    <Button key={index} onClick={()=>{clickFunc(`${settings.api_prefix}/history/${item.link}`)}}>{item.name}</Button>
                ))}
            </Space>
        </Modal>
    )
}

export default ExportModal