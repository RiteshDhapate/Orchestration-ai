import React, { useRef, useEffect, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'

const statesList = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
}

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

function getColor(min, max, current) {
  // Ensure the current value falls within the min-max range
  current = Math.max(min, Math.min(current, max))

  // Normalize the current value to a value between 0 and 1
  const ratio = (current - min) / (max - min)

  // Define colors for different points in the gradient
  const colors = [
    { ratio: 0, color: [0, 0, 255] }, // Blue
    { ratio: 0.25, color: [75, 0, 130] }, // Violet
    { ratio: 0.5, color: [255, 0, 255] }, // Pink
    { ratio: 0.75, color: [255, 165, 0] }, // Orange
    { ratio: 1, color: [255, 255, 0] } // Yellow
  ]

  // Find two colors to interpolate between
  let lowerColor, upperColor
  for (let i = 0; i < colors.length - 1; i++) {
    if (ratio >= colors[i].ratio && ratio <= colors[i + 1].ratio) {
      lowerColor = colors[i]
      upperColor = colors[i + 1]
      break
    }
  }

  // Interpolate between the lowerColor and upperColor
  const range = upperColor.ratio - lowerColor.ratio
  const rangeRatio = (ratio - lowerColor.ratio) / range

  const r = Math.round(
    (1 - rangeRatio) * lowerColor.color[0] + rangeRatio * upperColor.color[0]
  )
  const g = Math.round(
    (1 - rangeRatio) * lowerColor.color[1] + rangeRatio * upperColor.color[1]
  )
  const b = Math.round(
    (1 - rangeRatio) * lowerColor.color[2] + rangeRatio * upperColor.color[2]
  )

  // Convert RGB to HEX format
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`

  return hex
}

const HeatMap = ({
  bounds,
  // points,
  states,
  table
}) => {
  const [windowSize, setWindowSize] = useState(0)

  const mapContainerRef = useRef(null)
  let minCount = states?.at(0)?.count
  let maxCount = 0
  const parsedData = states?.map(stateData => {
    if (minCount > stateData?.count) minCount = stateData?.count
    if (maxCount < stateData?.count) maxCount = stateData?.count

    return {
      stateName: statesList?.[stateData?.region] || '',
      value: stateData?.count || 0
    }
  })

  const calculatedStateAndHexArray = parsedData?.reduce((acc, curr) => {
    if (!curr?.stateName) return acc

    acc?.push([curr?.stateName])
    acc?.push(getColor(minCount, maxCount, curr?.value))

    return acc
  }, [])


  useEffect(() => {
    function outputSize(resizeObservation) {
      const width = resizeObservation?.at(0)?.contentRect?.width
      setWindowSize(width || 300)
    }

    new ResizeObserver(outputSize).observe(
      document.getElementById('chatbot-wrapper')
    )
  }, [])

  useEffect(() => {
    const defaultBounds = [
      [-126.0, 24], // Southwest coordinates of the US
      [-66, 50] // Northeast coordinates of the US
    ]

    const mapBounds = bounds || defaultBounds

    const center = [
      (mapBounds[0][0] + mapBounds[1][0]) / 2,
      (mapBounds[0][1] + mapBounds[1][1]) / 2
    ]

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center,
      zoom: 2.5,
      maxBounds: mapBounds,
      attributionControl: false
    })

    let hoveredPolygonId = null

    map.on('load', () => {
      map.setPaintProperty('background', 'background-color', '#FFF')
      map.setPaintProperty('water', 'fill-color', '#fff')

      // Everything outside USA paint white
      map.addLayer({
        id: 'black-fill',
        type: 'fill',
        source: {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'
        },
        paint: {
          'fill-color': '#fff'
        }
      })

      // load us states
      map.addSource('states', {
        type: 'geojson',
        // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
        data: 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json'
      })

      map.addLayer({
        id: 'state-fills',
        type: 'fill',
        source: 'states',
        layout: {},
        paint: {
          'fill-color': [
            'match',
            ['get', 'name'],
            ...calculatedStateAndHexArray,
            '#f0f0f0'
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.7
          ]
        }
      })

      // paint states border to white
      map.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'states',
        layout: {},
        paint: {
          'line-color': '#fff',
          'line-width': 1
        }
      })

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })

      // hover functionality handlers
      map.on('mousemove', 'state-fills', e => {
        if (e.features.length > 0) {
          if (hoveredPolygonId !== null) {
            map.setFeatureState(
              { source: 'states', id: hoveredPolygonId },
              { hover: false }
            )
          }
          hoveredPolygonId = e.features[0].id
          map.setFeatureState(
            { source: 'states', id: hoveredPolygonId },
            { hover: true }
          )
        }
      })
      map.on('mouseleave', 'state-fills', () => {
        popup.remove()
        if (hoveredPolygonId !== null) {
          map.setFeatureState(
            { source: 'states', id: hoveredPolygonId },
            { hover: false }
          )
        }
        hoveredPolygonId = null
      })

      map.on('mousemove', 'state-fills', e => {
        const parcelCount = parsedData?.find(
          d => d.stateName === e.features[0].properties.name
        )?.value
        if (!!parcelCount) {
          popup
            .setLngLat(e.lngLat)
            .setHTML(
              `
              <div style="background-color: white; font-family: Arial, sans-serif;">
                <h2 style="color: #333333; margin: 0; font-size: 18px; font-weight: 600;">${e.features[0].properties.name}</h2>
                <div style="color: #666666; font-size: 14px; margin-top: 4px;">Parcel Count: ${parsedData?.find(d => d.stateName === e.features[0].properties.name)?.value}</div>
              </div>
              `
            )
            .addTo(map)
        } else {
          popup.remove()
        }
      })

      const layersToRemove = [
        'country-label',
        'state-label',
        'settlement-label',
        'water-label',
        'poi-label',
        'road-label',
        'transit-label'
      ]

      layersToRemove.forEach(layer => {
        if (map.getLayer(layer)) {
          map.removeLayer(layer)
        }
      })

      const bounds = [
        [-125.00165, 24.9493], // Southwest coordinates of the US
        [-66.9326, 49.5904] // Northeast coordinates of the US
      ]
      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 }
      })
    })

    return () => map.remove()
  }, [bounds, states, windowSize])

  const dynamicDimensions = () => {
    if (windowSize < 350) {
      return {
        width: 300,
        height: 180
      }
    } else if (windowSize < 500) {
      return {
        width: 400,
        height: 230
      }
    } else if (windowSize < 750) {
      return {
        width: 600,
        height: 330
      }
    } else if (windowSize < 1000) {
      return {
        width: 700,
        height: 380
      }
    } else if (windowSize < 1250) {
      return {
        width: 850,
        height: 400
      }
    } else if (windowSize < 1500) {
      return {
        width: 1150,
        height: 600
      }
    }

    return {
      width: 500,
      height: 300
    }
  }


  return (
    <div
      id={`map-wrapper-${windowSize}`}
      key={`map-wrapper-${windowSize}`}
      className={`flex bg-white`}
    >
      <div className={`flex-1`}>
        <div
          id={`map-wrapper-${windowSize}`}
          key={`map-wrapper-${windowSize}`}
          className='map-container'
          ref={mapContainerRef}
          style={{
            width: `${Math.floor(windowSize * 0.45)}px`,
            height: `${Math.floor(windowSize * 0.25)}px`
          }}
        />
      </div>
      <div className={`flex-2`}>
        <GradientScale
          windowSize={windowSize}
          min={16000}
          max={34000}
          title='parcel_count'
        />
        Gradient
      </div>
    </div>
  )
}

export default HeatMap

const GradientScale = ({ min, max, title, windowSize }) => {
  const steps = 10
  const range = max - min
  const stepSize = range / (steps - 1)

  return (
    <div
      className={`flex flex-col p-4 w-full max-w-xs h-full justify-center items-center`}
    >
      <h2 className='text-[5px] sm:text-[7px] md:text-[12px] font-semibold mb-1 text-black'>
        {title}
      </h2>

      <div
        key={`windowSize-${windowSize}`}
        className={`relative rounded-sm overflow-visible`}
        style={{
          height: `${Math.ceil(windowSize * 0.17)}px`,
          width: `${Math.ceil(windowSize * 0.014167)}px`
        }}
      >
        <div
          className='w-full h-full'
          style={{
            background:
              'linear-gradient(to bottom, #ffff00, #ffa500, #ff8c00, #ff6347, #ff69b4, #8a2be2, #4b0082, #000080)'
          }}
        />
        {[...Array(steps)].map((_, index) => (
          <div
            key={index}
            className='absolute mr-2 text-[5px] sm:text-[7px] md:text-[12px] text-black'
            style={{
              top: `${index * (100 / (steps - 1))}%`,
              left: '110%',
              transform: 'translateY(-50%)'
            }}
          >
            {abbreviateNumber(Math.round(max - index * stepSize))}
          </div>
        ))}
      </div>
    </div>
  )
}

const abbreviateNumber = value => {
  const suffixes = ['', 'k', 'M', 'B', 'T'] // Suffixes for thousand, million, billion, trillion, etc.
  let suffixIndex = 0

  // Convert the number to a shortened form by dividing by 1000 and tracking the suffix index
  while (value >= 1000 && suffixIndex < suffixes.length - 1) {
    value /= 1000
    suffixIndex++
  }

  // Format the number to one decimal place if it's not a whole number
  const formattedValue = value % 1 !== 0 ? value.toFixed(1) : value.toString()

  return `${formattedValue}${suffixes[suffixIndex]}`
}
