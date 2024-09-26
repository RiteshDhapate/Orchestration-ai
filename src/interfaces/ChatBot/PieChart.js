import React, { useCallback, useEffect, useRef, useState } from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import './Pie.css'
import { Button } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import clsx from 'clsx'

FusionCharts.options.license({
  key: 'AA-65A15wje1E5C1E4B1A17B8A3D3C2A1B3D1E2gvxC3E5qyuiI-7B6B1mA-13tF5H2E4J2A4D4C4C6E2D1F4E1D1A7C8A3cE-11B-9F2A2H2vB2D3D2knyE1C3C11gapB4E4D4kH-7C-21D7E4F4C1H5G1G1I4B6C1E3pzzC1G4AB3zD-13mD1D3G4dwB14XB6C6mmC-8D3J2A9B2C1E7B5F1C4G4B1A9B11B2d==',
  creditLabel: false
})

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

const pieChartCustomConfiguration = {
  startingAngle: '120',
  showLabels: '1',
  showLegend: '0',
  enableMultiSlicing: '0',
  slicingDistance: '20',
  showPercentValues: false,
  showPercentInTooltip: false,
  showValues:1,
  theme: 'fusion',
  baseFontColor: 'black',
  baseFontSize: '16',
  baseFont: 'MONTSERRAT, sans-serif',
  bgColor: '#336a78',
  labelfontcolor: '#fff',
  showTooltip:true,
  pieYScale: 50,
  manageLabelOverflow: true
}

const formatSpendAmount = amount => {
  if (amount >= 1000000) {
    return `$<span>${(amount / 1000000).toFixed(1)}<span style="font-size: 13px;">MM</span></span>`
  } else {
    return '$' + amount.toLocaleString('en-US')
  }
}


const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

const PieChart = ({ chartData }) => {
  const [activeSlice, setActiveSlice] = useState(null)
  const [windowSize, setWindowSize] = useState(0)

  useEffect(() => {
    function outputSize(resizeObservation) {
      const width = resizeObservation?.at(0)?.contentRect?.width
      setWindowSize(width || 300)
    }

    new ResizeObserver(outputSize).observe(
      document.getElementById('chartWrapper')
    )

    // setActiveSlice({
    //   carrier: chartData.datasets?.[0].label,
    //   volume: chartData.datasets?.[0].volumePercentage,
    //   details: chartData.datasets?.[0].data
    // })
  }, [])

  const getWidthBasedOnWindowSize = () => {
    if (windowSize < 400) {
      return {
        pieRadius: '90',
        pieSliceDepth: '20',
        showLabels: '0',
        showPercentValues: '0',
        showLine: '0',
        showValues: '0'
      }
    } else if (windowSize < 550) {
      return {
        pieRadius: '150',
        pieSliceDepth: '30',
        showLabels: '0',
        showPercentValues: '0',
        showLine: '0',
        showValues: '0'
      }
    } else if (windowSize < 750) {
      return {
        pieRadius: '160',
        pieSliceDepth: '40',
        showLabels: '0',
        showPercentValues: '0',
        showLine: '0',
        showValues: '0'
      }
    } else if (windowSize < 1000) {
      return {
        pieRadius: '160',
        pieSliceDepth: '60'
      }
    } else if (windowSize < 1550) {
      return {
        pieRadius: '170',
        pieSliceDepth: '60'
      }
    } else {
      return {
        pieRadius: '220',
        pieSliceDepth: '70'
      }
    }
  }

  const dataSource = useCallback(
    () => ({
      chart: {
        ...pieChartCustomConfiguration,
        ...getWidthBasedOnWindowSize()
      },
      data: chartData?.datasets?.[0]?.data?.map((data, index) => ({
        label: `${data?.label}`,
        value: data?.value,
        isSliced: index === 0
      }))
    }),
    [windowSize]
  )

  if (!chartData) {
    return <div></div>
  }

  const events = {
    dataplotClick: function (evt) {
      const categoryLabel = evt.data.categoryLabel
      const label = categoryLabel.split('-')[0]?.trim()
      const service = categoryLabel.split('-')[1]?.trim()

      const dataset = chartData.datasets.find(dataset => {
        return (
          dataset.label?.trim() === label &&
          dataset.serviceType?.includes(service)
        )
      })

      if (dataset) {
        setActiveSlice({
          carrier: dataset?.label,
          volume: evt.data.dataValue,
          details: dataset.data
        })
      }
    }
  }

  return (
    <>
      <div
        id='chartWrapper'
        className={clsx(
          'max-w-full mx-auto px-2 py-4 flex  justify-between items-center gap-2 bg-[#336a78] rounded-t-md mt-4',
          windowSize < 550 ? 'flex-col-reverse' : 'flex-row'
        )}
      >

        <div className={clsx(windowSize < 550 ? 'w-full' : 'w-2/3')}>
          <ReactFC
            key={`chart-${windowSize}`}
            height={
              windowSize < 400
                ? '180'
                : windowSize < 550
                  ? '250'
                  : windowSize < 750
                    ? '300'
                    : '350'
            }
            {...{
              type: 'pie3d',
              width: '100%',
              dataFormat: 'JSON',
              dataSource: dataSource(),
              events
            }}
          />
        </div>
      </div>

      <div className='flex mt-[8px] justify-end rounded-b-md py-2 px-4 bg-[#336a78]'>
        <Button leftIcon={<CopyIcon />} variant='ghost' colorScheme='#74BCFF'>
          Copy
        </Button>
      </div>
    </>
  )
}

export default PieChart