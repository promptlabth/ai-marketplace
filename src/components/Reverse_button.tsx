import React from 'react'
import Link from "next/link";

const Reverse_button: React.FC<{ route_path: string }> = ({ route_path }) => {
    return (
        <div className="absolute top-5 left-5 m-4">
            <Link href={route_path}>
                <p className="text-white p-2 hover:text-gray-600 underline rounded">ย้อนกลับ</p>
            </Link>
        </div>
    )
}
export default Reverse_button