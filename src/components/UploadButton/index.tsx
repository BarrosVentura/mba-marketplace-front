import { ImageUpload01Icon } from 'hugeicons-react'
import { ClassNameValue, twMerge } from 'tailwind-merge'

export function UploadButton({
  size,
  className,
  imgSrc
}: {
  size: 'user' | 'product'
  className?: ClassNameValue
  imgSrc?: string
}) {
  const styles = twMerge(
    'relative group rounded-xl bg-shape hover:bg-background',
    size == 'user' ? 'h-[120px] w-[120px]' : 'h-[340px] w-full',
    className
  )

  const iconStyle = twMerge(size == 'user' ? 'size-8' : 'size-10')

  return (
    <button className={styles}>
      {imgSrc ? (
        <img src={imgSrc} className='h-full object-cover' />
      ) : (
        <div className='flex flex-col items-center justify-center gap-4'>
          <ImageUpload01Icon
            className={twMerge(iconStyle, 'text-orange-base')}
          />
          {size == 'product' && (
            <span className='body-sm text-gray-300'>
              Selecione a imagem do produto
            </span>
          )}
        </div>
      )}
      <div className='invisible absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl bg-black bg-opacity-60 group-hover:visible'>
        <ImageUpload01Icon className={twMerge(iconStyle, 'text-white')} />
        {size == 'product' && (
          <span className='body-sm text-white'>
            Selecione a imagem do produto
          </span>
        )}
      </div>
    </button>
  )
}
