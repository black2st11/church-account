import React from 'react'
import {Modal, Space, Button} from 'antd'
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
                {exports.map(item=>(
                    <Button onClick={item.onClick}>{item.name}</Button>
                ))}
            </Space>
        </Modal>
    )
}

export default ExportModal