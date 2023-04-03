import React, { useEffect, useState } from "react"
import { getHistory, updateHistory } from "../api/history"
import {returnValueByNumberFormat, returnValueByNumber, focusItem} from '../util'
import {Modal, Space, Input, Select} from 'antd'

const UpdateModal = ({open, setOpen, id, options}) => {
    const [data, setData] = useState({name: null, amount: null, category: null})

    useEffect(()=>{
        (async()=>{
            let res = await getHistory(id)
            if (!res){
                return alert("항목 저장중 에러발생")
            }
            console.log(res)
            setData({...res.data, id})
        })()
        focusItem('update-name')
    },[])

    return (
        <Modal 
            open={open}
            onCancel={()=>setOpen(false)}
            onOk={()=>{
                setOpen(false)
                updateHistory({...data})
            }}
            okText="수정"
            cancelText='취소'
            style={{alignContent: 'center', justifyContent: 'center', display: 'flex'}}
        >
            <Space direction='vertical' style={{marginTop : '2rem'}}>
                <label htmlFor='update-name'>
                    이름
                    <Input id='update-name' value={data.name} onChange={e=>setData({...data, name: e.target.value})} />
                </label>
                <label htmlFor='update-category'style={{display:'flex', flexDirection: 'column'}}>
                    종류
                    <Select id='update-category' value={data.category} options={options} onChange={e=>setData({...data, category: e})} />
                </label>
                <label htmlFor='update-amount'>
                    금액
                    <Input id='update-amount' value={returnValueByNumberFormat(data.amount)} onChange={e=>setData({...data, amount: returnValueByNumber(e.target.value)})}  />
                </label>
            </Space>
        </Modal>
    )
}

export default UpdateModal