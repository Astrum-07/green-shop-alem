import React from 'react';
import type { FC } from 'react';
import { useNavigate } from "react-router-dom";
import {
    HeartFilled,
    HeartOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";

import type { ProductType } from '../../../../@types';

const Card: FC<ProductType> = (props) => {

    const icon_style = "bg-[#FFFFFF] w-[35px] h-[35px] flex rounded-lg justify-center items-center cursor-pointer text-[20px] hover:text-[#46A358] transition-colors";

    return (
        <div className="relative w-full">

            <div className="group h-[300px] bg-[#f5f5f5] flex justify-center items-center relative overflow-hidden rounded-sm">
                <img
                    src={props.main_image}
                    alt="flower"
                    className="w-4/5 max-sm:h-[100%] object-contain"
                />


                <div className="hidden gap-3 justify-center inset-x-auto absolute bottom-[20px] items-center group-hover:flex animate-in fade-in slide-in-from-bottom-2">
                    <div className={`${icon_style}`}>
                        <ShoppingCartOutlined />
                    </div>
                    <div className={`${icon_style}`}>

                        <HeartFilled className="text-red-500" />
                    </div>
                    <div className={`${icon_style}`}>
                        <SearchOutlined />
                    </div>
                </div>


                {props.discount && (
                    <div className="bg-[#46A358] text-white absolute top-4 left-0 px-[10px] py-[3px] text-sm font-medium">
                        13% OFF
                    </div>
                )}
            </div>

            {/* Pastki qism: Ma'lumotlar */}
            <div className="mt-2">
                <h3 className="text-[#3D3D3D] text-[16px] font-[500] pt-[10px] pb-[2px]">
                    {props.title}
                </h3>
                
                <div className="flex items-center gap-3">
                    {/* Asosiy narx */}
                    <h1 className="text-[#46A358] text-[18px] font-bold">
                        {props.price}$
                    </h1>

                    {/* Agar chegirma bo'lsa, eski narxni ko'rsatish */}
                    {props.discount && props.discount_price && (
                        <h1 className="font-[300] text-[#A5A5A5] line-through text-[16px]">
                            {props.discount_price}$
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;