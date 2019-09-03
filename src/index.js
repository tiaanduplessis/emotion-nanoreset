import React from 'react'
import { Global, css } from '@emotion/core'
import reset from './reset'

const Nanoreset = () => <Global styles={css`${reset}`}/>

export default Nanoreset
