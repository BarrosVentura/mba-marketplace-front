import { ImageUpload01Icon } from 'hugeicons-react'

export function UploadButton() {
  return (
    <button className='grid h-[120px] w-[120px] place-content-center rounded-xl bg-shape hover:bg-background'>
      <ImageUpload01Icon className='h-8 w-8 text-orange-base' />
    </button>
  )
}
