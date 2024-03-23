import React from 'react'
import Dropdown from '@/components/Dropdown'
import InputDetial from "@/components/InputDetial"

const Ape = () => {
    return (
        <div className='flex w-full flex-col gap-3 overflow-x-auto'>
            <p className='p-1 text-[#6C757D] text-[15px]'>อธิบาย:  APE เป็น เหมาะกับงานที่ต้องการการสร้างเนื้อหา, การวิเคราะห์, การแก้ไขปัญหา, การเรียนรู้, และการสร้างสื่อโต้ตอบด้วยความชัดเจนในเป้าหมายและความคาดหวัง</p>
            <Dropdown />
            <InputDetial detail='(Propsoe) เป้าหมายของ Agent (นักกฏหมาย)'/>
            <InputDetial detail='(Expectation) ผลลัพธ์/สิ่งที่คาดหวังของ Agent (นักกฏหมาย)'/>
        </div>
    )
}

export default Ape