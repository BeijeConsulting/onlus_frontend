import React from 'react'
import { Skeleton } from '@mui/material'
import './skeletoncard.scss'


function SkeletonCard() {

  return (

    <div id='skeletonCard'>
        <div className="titleText">
            <Skeleton variant='text' animation='wave' width={'30%'}/>
        </div>
        <div className="image">
            <Skeleton variant='rectangular' animation='wave' width={'100%'} height={'100%'} />
        </div>
        <div className="bodyText">
            <Skeleton variant='text' animation='wave' />
            <Skeleton variant='text' animation='wave' />
            <Skeleton variant='text' animation='wave' />
            <Skeleton variant='text' animation='wave' />
        </div>
    </div>
  )
}

export default SkeletonCard