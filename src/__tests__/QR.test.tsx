import 'vitest-canvas-mock'
import { QR } from '../QR'
import { render } from '@testing-library/react'

describe('QR', () => {
  it('should render QR component', () => {
    render(<QR open={true} onClose={() => vi.fn()} />)
  })
})
