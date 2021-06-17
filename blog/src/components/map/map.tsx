import cn from 'classnames'
import React from 'react'
import {
  YMaps,
  Map as YMap,
  Placemark,
  MapState,
  MapProps
} from 'react-yandex-maps'
import * as s from './map.module.css'

export type Coordinates = [lat: number, lng: number]

interface Props extends MapProps {
  coordinates: Coordinates[]
  mapData?: MapState
}

export default function Map(props: Props) {
  const {
    className,
    coordinates,
    mapData = {
      center: coordinates[0],
      zoom: 6
    },
    ...restProps
  } = props

  if (!coordinates.length) {
    return null
  }

  return (
    <YMaps>
      <YMap
        className={cn(s.Map, className)}
        defaultState={mapData}
        {...restProps}>
        {coordinates.map((coordinate, ndx) => (
          <Placemark key={ndx} geometry={coordinate} />
        ))}
      </YMap>
    </YMaps>
  )
}
