import React,{FC} from 'react'
import { Skeleton } from '@mui/material'
import './skeletonSquare.scss'
import { Navigate } from 'react-router-dom'

interface Props {
    direction?: 'column-reverse'
}

const SkeletonSquare:FC<Props> = (props) => {

  return (

    <div id='skeletonSquare' style={{flexDirection:props.direction}}>
        <div className="titleText">
            <Skeleton variant='text' animation='wave' />
        </div>
        <div className="image">
            <Skeleton variant='rectangular' animation='wave' width={'100%'} height={'100%'} />
        </div>
    </div>
  )
}

export default SkeletonSquare