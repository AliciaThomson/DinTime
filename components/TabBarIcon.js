import React from 'react'
import { AntDesign } from '@expo/vector-icons'

export default TabBarIcon = props =>
  <AntDesign
    name={props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={props.focused ? '#173143' : '#ccc'}
  />
