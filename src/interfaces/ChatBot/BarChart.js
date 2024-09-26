import clsx from 'clsx'
import { CopyIcon } from '@chakra-ui/icons'
import { useCallback, useEffect, useState } from 'react'
import ReactFC from 'react-fusioncharts'
import { Button } from '@chakra-ui/react'

const barChartCustomConfiguration = {
  theme: 'fusion',
  showValues: true,
  placeValuesInside: false,
  bgColor: '#336a78',
  showYAxisLine: false,
  xAxisLineColor: '#fff',
  valueFontColor: '#fff',
  yAxisValueFontColor: '#fff',
  numDivLines: 4,
  divLineDashed: true,
  divLineColor: '#fff',
  divLineDashLen: 3,
  divLineDashGap: 3,
  legendItemFontColor: '#fff',
  legendBorderColor: '#000',
  legendBorderThickness: 5,
  legendIconBorderColor: '#000',
  legendIconBorderThickness: 1,
  labelFontColor: '#fff',
  showXAxisLine: true,
  valueFontBold:true,
  yAxisValueFontBold: true,
  labelFontBold:true
}

const BarChart = ({ chartData }) => {
  const [windowSize, setWindowSize] = useState(0)

  useEffect(() => {
    function outputSize(resizeObservation) {
      const width = resizeObservation?.at(0)?.contentRect?.width
      setWindowSize(width || 300)
    }

    new ResizeObserver(outputSize).observe(
      document.getElementById('chart-wrapper')
    )
  }, [])

  const getWidthBasedOnWindowSize = () => {
    if (windowSize < 400) {
      return {
        maxColWidth: 50,
        valueFontSize: 8,
        yAxisValueFontSize: 8,
        labelFontSize: 8,
        rotateLabels: true
      }
    } else if (windowSize < 550) {
      return {
        maxColWidth: 50,
        valueFontSize: 12,
        yAxisValueFontSize: 12,
        labelFontSize: 12,
        rotateLabels: true
      }
    } else if (windowSize < 750) {
      return {
        maxColWidth: 50,
        valueFontSize: 12,
        yAxisValueFontSize: 12,
        labelFontSize: 12
      }
    } else if (windowSize < 1000) {
      return {
        maxColWidth: 50,
        valueFontSize: 14,
        yAxisValueFontSize: 14,
        labelFontSize: 14
      }
    } else if (windowSize < 1550) {
      return {
        maxColWidth: 50,
        valueFontSize: 15,
        yAxisValueFontSize: 15,
        labelFontSize: 15
      }
    } else {
      return {
        maxColWidth: 50,
        valueFontSize: 18,
        yAxisValueFontSize: 18,
        labelFontSize: 18
      }
    }
  }

  const dataSource = useCallback(
    () => ({
      chart: {
        ...barChartCustomConfiguration,
        ...getWidthBasedOnWindowSize()
      },
      ...chartData
    }),
    [windowSize,chartData]
  )

  if (!chartData) {
    return <div></div>
  }

  return (
    <>
      <div
        id='chart-wrapper'
        className={clsx(
          'max-w-full mx-auto px-2 py-4 flex  justify-between items-center gap-2 bg-[#336a78] rounded-t-md mt-4',
          'flex-col'
        )}
      >
        <ReactFC
          key={`bar-chart-${windowSize}`}
          height={
            windowSize < 400
              ? '300'
              : windowSize < 550
                ? '350'
                : windowSize < 750
                  ? '300'
                  : '350'
          }
          {...{
            type: 'column2d',
            width:
              windowSize < 400
                ? '80%'
                : windowSize < 550
                  ? '85%'
                  : windowSize < 750
                    ? '93%'
                    : '90%',
            dataFormat: 'JSON',
            dataSource: dataSource()
          }}
        />
      </div>

      <div className='flex mt-[8px] justify-end rounded-b-md py-2 px-4 bg-[#336a78]'>
        <Button leftIcon={<CopyIcon />} variant='ghost' colorScheme='#74BCFF'>
          Copy
        </Button>
      </div>
    </>
  )
}

export default BarChart
