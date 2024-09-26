import jsPDF from 'jspdf'
import PdfIcon from '../../assets/PdfIcon'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react'
import { Logo } from '../../componentLibrary'
import { LogoBase64 } from '../../componentLibrary/components/Logo/Logo_Base64'
function MarketResearchComponent({ marketResearch }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const renderString = (str, index) => {
    const headingLevel = str.match(/^#+/)?.[0].length || 0
    const content = str.replace(/^#+\s*/, '').trim()

    let className = ''
    switch (headingLevel) {
      case 1:
        className = 'text-3xl font-extrabold '
        break
      case 2:
        className = 'text-2xl font-bold'
        break
      case 3:
        className = 'text-xl font-semibold'
        break
      default:
        className = 'text-md'
    }

    return (
      <div className={`px-4 ${className}`} key={`report-${index}`}>
        {content}
      </div>
    )
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    let yPosition = 50 // Start position for text after logo, considering padding-top
    const lineHeight = 10 // Adjust line height for text
    const pageHeight = doc.internal.pageSize.height // Height of the PDF page
    const pageWidth = doc.internal.pageSize.width - 20 // Width of the page, with some margin
    const gap = 4 // Spacing between elements (similar to `gap-4` in Tailwind)

    // Set gray background
    doc.setFillColor('#191A22')
    doc.setTextColor('#ffffff')
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      'F'
    )
    doc.addImage(LogoBase64, 'JPEG', 10, 10, 40, 20)

    yPosition += 5 // Adding top padding

    marketResearch?.data?.reports?.forEach((str, index) => {
      const headingLevel = str.match(/^#+/)?.[0].length || 0
      const content = str.replace(/^#+\s*/, '').trim()

      // Determine font size and style based on heading level
      let fontSize = 12 // Default font size
      let fontStyle = 'normal'

      switch (headingLevel) {
        case 1:
          fontSize = 22
          fontStyle = 'bold'
          break
        case 2:
          fontSize = 18
          fontStyle = 'bold'
          break
        case 3:
          fontSize = 16
          fontStyle = 'bold'
          break
        default:
          fontSize = 12
          fontStyle = 'normal'
          doc.setFont('helvetica', 'normal')
      }

      doc.setFontSize(fontSize)
      doc.setFont(undefined, fontStyle)

      // Split the text into lines that fit within the page width
      const lines = doc.splitTextToSize(content, pageWidth)

      lines.forEach(line => {
        // Check if the current position exceeds the page height
        if (yPosition + lineHeight + gap > pageHeight) {
          doc.addPage() // Add a new page if necessary
          yPosition = 20 // Reset y position for the new page, with padding-top
          doc.setFillColor('#191A22')
          doc.setTextColor('#ffffff')
          doc.rect(
            0,
            0,
            doc.internal.pageSize.width,
            doc.internal.pageSize.height,
            'F'
          )
        }

        doc.text(line, 10, yPosition) // Positioning text
        yPosition += lineHeight // Move y position for the next line
      })

      // Add gap after each block of content (similar to `gap-4`)
      yPosition += gap
    })
    doc.save('market_research_report.pdf')
  }

  return (
    <>
      <div>
        <div className='text-2xl'>Agent Report</div>
        <div className='p-2'>
          An agent tailored specifically to your task will be generated to
          provide the most precise and relevant research result
        </div>
        <div className='flex flex-col gap-4 h-[350px] overflow-y-auto bg-[#4AE5c9] bg-opacity-20 rounded-lg mb-8 py-4'>
          {marketResearch?.data?.logs?.map((log, index) => (
            <div className='px-4 text-md ' key={`log-${index}`}>
              {log}
            </div>
          ))}
        </div>

        <div className='flex justify-between '>
          <h2 className='font-semibold text-3xl'>Research Report</h2>

          {!marketResearch?.logLoader && (
            <div className='flex flex-row-reverse items-center cursor-pointer w-[200px] '>
              <span
                className='text-[#74BCFF] pr-4 pl-2  py-2 rounded-md '
                onClick={onOpen}
              >
                View PDF
              </span>
              <div>
                <PdfIcon />
              </div>
            </div>
          )}
        </div>

        <div className='mt-8 flex flex-col gap-4 py-4 overflow-y-auto bg-[#4AE5c9] bg-opacity-20 rounded-lg'>
          {marketResearch?.data?.reports?.map((str, index) =>
            renderString(str, index)
          )}
        </div>
        {marketResearch?.logLoader && (
          <div className='rounded-lg p-1 w-full bg-sky-100'>
            {' '}
            <span className='mx-4  text-sky-400 font-md '>
              Research in Progress...
            </span>{' '}
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl' isCentered>
        <ModalOverlay />
        <ModalContent bg='#2e3b4e' color='white' p={5} maxH='90vh'>
          <ModalHeader fontSize='2xl'>
            <Logo className='px-3' width='98px' mode='light' />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className='mt-8 flex flex-col gap-4 py-4 overflow-y-auto'>
            {marketResearch?.data?.reports?.map((str, index) =>
              renderString(str, index)
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={generatePDF}
              sx={{
                bgGradient: 'linear(to-r, #3BA0E6, #3B6EF3)', // Linear gradient from left to right
                color: 'white', // Text color
                _hover: {
                  bgGradient: 'linear(to-r, #3B6EF3, #3BA0E6)', // Reverse gradient on hover
                  boxShadow: 'lg'
                }
              }}
            >
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MarketResearchComponent
