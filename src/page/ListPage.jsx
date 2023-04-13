import React, { useEffect, useRef, useState } from 'react'
import {isMobile} from 'react-device-detect'
import {Layout, Button, Modal, DatePicker, Space, Table, Select, Input, Popconfirm, message, Card} from 'antd'
import dayjs from 'dayjs'
import { deleteHistory, getHistories, getHistory, saveHistory, updateHistory, isActive } from '../api/history';
import {TbArrowBigLeftFilled, TbArrowBigRightFilled} from 'react-icons/tb'
import {returnValueByNumber, returnValueByNumberFormat, focusItem, getToday} from '../util'
import UpdateModal from '../subpage/UpdateModal';
import ExportModal from '../subpage/ExportModal';
import RecoverModal from '../subpage/RecoverModal'

const {Header, Content, Footer} = Layout;
const ENTER = 'Enter'
const defaultOptions = [{value: '주정헌금', label:'주정헌금'}, {value: '십일조', label:'십일조'}, {value: '건축헌금', label:'건축헌금'},{value: '감사헌금', label:'감사헌금'}]

const sumData = (categoryArray) => {
    let data = new Intl.NumberFormat().format(categoryArray?.reduce((prevValue, value)=> prevValue + value.amount, 0))
    return data !== "NaN" ? data : 0;
}

const isExist = (arrayProps=[{}], inputProps='') => {
    let flag = false
    arrayProps.forEach(item=>{
        if(item.value == inputProps){
            flag = true
        }
    })
    return flag
}


const Tables = ({data=[], options=[], udpateAction, deleteAction, setPrevOrder, setNextOrder}) => {
    return options.map((category, index) => (
        <Space key={index} direction='vertical' style={{margin: '1rem', width: '330px'}}>
            <div style={{display: 'flex'}}>
                {category.value} {' '}
                {sumData(data[category.value])} 
                <div style={{margin: 'auto 0 auto auto'}}>
                    <TbArrowBigLeftFilled size={20} style={{cursor: 'pointer', marginRight: '1rem'}} onClick={()=>setPrevOrder(category.value)} /> 
                    <TbArrowBigRightFilled size={20} style={{cursor: 'pointer'}} onClick={()=>setNextOrder(category.value)} />
                </div>
            </div>
            <Table dataSource={data[category.value]} scroll={{y:400}} pagination={false} >
                <Table.Column align='center' title='이름' dataIndex={'name'} key={'name'} />
                <Table.Column align='center' title='금액' key={'amount'} render={(_, record)=>(<span>{new Intl.NumberFormat().format(record.amount)}</span>)} />
                <Table.Column align='center' title='상호작용' key={'action'} render={(_, record)=>(
                    <Popconfirm 
                        placement='top' 
                        title='상호작용' 
                        description='취소할려면 화면밖을 눌러주세요.' 
                        okText='수정' 
                        onConfirm={()=>udpateAction(record.id)}
                        cancelText='삭제'
                        onCancel={()=>deleteAction(record.id)}
                        >
                        <Button>상호작용</Button>
                    </Popconfirm>
                )} />
            </Table>
        </Space>
    ))
}


const ListPage = () => {
    const [date, setDate] = useState(getToday())
    const [dateModal, setDateModal] = useState(false)
    const [exportModal, setExportModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [recoverModal, setRecoverModal] = useState(false)
    const [item, setItem] = useState({name: '', category: null, amount: 0})
    const [updateId, setUpdateId] = useState(null)
    const [options, setOptions] = useState(defaultOptions)
    const [data, setData] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    const [search, setSearch] = useState('')
    const [refreshToggle, setRefreshToggle] = useState(false)
    const generateSummary = (data) => {
        let summary = []
        let result = 0
        options.forEach(option=> {
            let sum = data[option.value]?.reduce((prevValue, value)=> prevValue + value.amount, 0)
            sum = sum ? sum : 0
            result += sum
        })
        summary.push({name: '합계', value: new Intl.NumberFormat().format(result)})
        return summary
    }

    const refresh = async () => {
        let res = await getHistories(date)
        if (res){
            setData(res.data)
            let newOptions = defaultOptions.slice()
            for (let key in res.data){
                if(!isExist(options, key)){
                    newOptions.push({value: key, label: key})
                }
            }
            setOptions(newOptions)
        }

    }

    useEffect(()=>{
        if(isMobile){
            window.location = 'https://black2st11.pythonanywhere.com/api/history/camera/'
        }else{
            (async()=>{
                let res = await isActive()
                if (!res){
                    alert(res)
                    alert('관리자 페이지에서 활성화를 해주세요.')
                    window.location.href = 'https://naver.com'
                }
            })();
        }
    },[])

    useEffect(()=>{
        (async()=>{
            if(date){
                await refresh()
            }
        })();
    },[date, refreshToggle])

    const submit = async () => {
        let res = await saveHistory({...item, date})
        if (!res){
            return alert("항목 저장중 에러발생")
        }
        setItem({...item, name: '', amount: 0})        
        setRefreshToggle(!refreshToggle)
        focusItem('name')
        return true;
    }

    const updateAction = async (id) => {
        setUpdateId(id)
        setUpdateModal(true)
    }

    const deleteAction = async (id) => {
        let res = await deleteHistory({id})
        if (!res){
            return messageApi.warning("삭제 처리가 정상적으로 이루어지지 않았습니다.")
        }
        setRefreshToggle(!refreshToggle)
        messageApi.info('삭제가 완료되었습니다.')
    }

    const findKey = (key, array=[]) => {
        let index = -1
        array.forEach((v, i)=>{
            if(v.value == key){
                index = i
            }
        })
        return index
    }
    
    const setPrevOrder = (key) => {
        let index = findKey(key, options)
        
        if(index === 0){
            return 
        }

        let switch_key = options[index-1]
        let left = options.slice(0, index-1)
        let right = options.slice(index + 1, options.length)
        left.push({value: key , label: key})
        left.push(switch_key)
        let newOptions = left.concat(right)
        setOptions(newOptions)
    }

    const setNextOrder = (key) => {
        let index = findKey(key, options)
        if(index == options.length -1){
            return
        }
        let switch_key = options[index + 1]
        
        let left = options.slice(0, index)
        let right = options.slice(index + 2, options.length)
        left.push(switch_key)
        left.push({value: key, label: key})
        let newOptions = left.concat(right)
        setOptions(newOptions)
    }
    return (
        <Layout className='layout'>
            {contextHolder}
            <Header style={{height: '7vh', display: 'flex', alignItems : 'center'}}>
                <Button style={{marginRight: '1rem'}} onClick={()=>{setDateModal(true)}}>조회</Button>
                <Button onClick={()=>setExportModal(true)}>출력</Button>
                <Button style={{marginLeft: '1rem'}} onClick={()=>setRecoverModal(true)}>복구하기</Button>
                <Button style={{marginLeft: "auto"}} onClick={refresh}>새로고침</Button>
            </Header>
            <Content style={{height: '80vh', maxWidth: '100vw', overflowX: 'scroll'}}>
                <Card style={{ width: 300, margin: '1rem auto 1rem 1rem' }}>
                    {generateSummary(data).map((item, index)=>(
                        <div key={index} style={{display: 'flex', borderBottom: '1px solid #292929', paddingBottom: '0.5rem', alignItems: 'center', marginTop: '0.5rem'}}>
                            <div style={{width: '10rem'}}>{item.name}</div>
                            <div>{item.value}</div>
                        </div>
                    ))}
                </Card>
                <div style={{width: '20rem', margin: '1rem'}}>
                    <Input.Search
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder='추가할 항목을 입력해주세요.' 
                        enterButton='추가' 
                        style={{minWidth: '20rem'}}
                        onSearch={(e)=>{
                            if(!isExist(options, e)){
                                let newOptions = options.slice()
                                newOptions.push({value: e, label:e})
                                setOptions(newOptions)
                                setSearch('')
                                setRefreshToggle(!refreshToggle)
                            }else{
                                alert('이미 등록되어진 항목입니다.')
                            }
                        }} 
                    />
                </div>

                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex'}}>
                        <Tables data={data} options={options} udpateAction={updateAction} deleteAction={deleteAction} setPrevOrder={setPrevOrder} setNextOrder={setNextOrder} />
                    </div>
                </div>
            </Content>
            <Footer style={{height: '13vh', background: "white", display: 'flex'}}>
                <Space>
                    <label htmlFor='category' style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{width: '3rem'}}>
                            종류:
                        </span>
                        <Select 
                            value={item.category} 
                            id='category' 
                            options={options} 
                            style={{width: '100px'}} 
                            onChange={(e)=>setItem({...item, category: e})}
                            placeholder='선택'
                            >
                        </Select>
                    </label>
                    <label htmlFor='name'  style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{width: '3rem'}}>
                            이름:
                        </span>
                       <Input id='name' value={item.name} onChange={(e)=>setItem({...item, name: e.target.value})}/> 
                    </label>
                    <label htmlFor='amount'  style={{display: 'flex',  alignItems: 'center'}}>
                        <span style={{width: '3rem'}}>
                            금액: 
                        </span>
                        <Input
                            value={returnValueByNumberFormat(item.amount)}
                            id='amount' 
                            onKeyDown={async(e)=>{
                                if (e.key == ENTER){
                                    await submit()
                                }
                            }}
                            onChange={(e)=>{
                                setItem({...item, amount: returnValueByNumber(e.target.value)})}} />
                    </label>
                    <Button type='primary' 
                        onClick={async()=>{
                            await submit()
                        }}>
                        저장
                        </Button>
                </Space>
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
                    onChange={(_, dateString)=>{
                        setDate(dateString ? dateString : getToday())
                    }} 
                    />
            </Modal>
            {exportModal && (<ExportModal open={exportModal} setOpen={setExportModal} exports={[{'name': '엑셀출력', 'link': `export_excel_by_week?date=${date}`}, {'name': '디모데 출력', 'link': `export_excel_for_dimode?date=${date}`}, {'name': 'xml출력', 'link': `export_xml?date=${date}`}, {'name': '회원 출력'}]} />)}
            {updateModal && (<UpdateModal open={updateModal}  setOpen={(e)=>{
                setUpdateModal(e)
                setRefreshToggle(!refreshToggle)
            }} id={updateId} options={options} />)}
            {recoverModal && (<RecoverModal open={recoverModal} setOpen={setRecoverModal}/>)}
        </Layout>
    )
}

export default ListPage;