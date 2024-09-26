import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Button } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

const MapBoxLoader = () => {
  const mapContainerRef = useRef()
  const mapRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    })
  })

  return (
    <>
      <div className='w-full rounded-t-md mt-4 overflow-hidden'>
        <div
          style={{ height: '300px', width: '100%' }}
          ref={mapContainerRef}
          className='map-container'
        />
      </div>
      <div className='flex mt-[8px] justify-end rounded-b-md py-2 px-4 bg-[#336a78]'>
        <Button leftIcon={<CopyIcon />} variant='ghost' colorScheme='#74BCFF'>
          Open Project Map
        </Button>
      </div>
    </>
  )
}

export default MapBoxLoader
