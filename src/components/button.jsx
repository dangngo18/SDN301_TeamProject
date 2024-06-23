import React from 'react'

export function ButtonStyle1({link,content}) {
    const handleClickHref = () =>{
        window.location.href = link;
    }
  return (
    <button onClick={(handleClickHref)} className={"btn_style1"}>{content}</button>
  )
}
