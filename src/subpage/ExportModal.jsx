import React from 'react'
import {Modal, Space, Button} from 'antd'
import settings from '../settings'

const ExportModal = ({open, setOpen, exports }) => {
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
                    <Button key={index} onClick={()=>{window.location =  `${settings.api_prefix}/history/${item.link}`}}>{item.name}</Button>
                ))}
            </Space>
        </Modal>
    )
}

export default ExportModal