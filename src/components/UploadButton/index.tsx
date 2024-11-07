import { AlertCircleIcon, ImageUpload01Icon } from 'hugeicons-react'
import { forwardRef, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { ClassNameValue, twMerge } from 'tailwind-merge'

interface UploadButtonProps {
  size: 'user' | 'product'
  className?: ClassNameValue
  imgSrc?: string
  errorMessage?: string
}

export const UploadButton = forwardRef<HTMLInputElement, UploadButtonProps>(
  function ({ size, className, imgSrc, errorMessage, ...rest }, ref) {
    const [temporaryImageUrl, setTemporaryImageUrl] = useState<string>()
    const styles = twMerge(
      'relative overflow-hidden group rounded-xl bg-shape hover:bg-background cursor-pointer',
      size == 'user' ? 'h-[120px] w-[120px]' : 'h-[340px] w-full',
      className
    )

    const iconStyle = twMerge(size == 'user' ? 'size-8' : 'size-10')

    return (
      <label className={styles}>
        {imgSrc || temporaryImageUrl ? (
          <img
            src={imgSrc || temporaryImageUrl}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full flex-col items-center justify-center gap-4'>
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
        <input
          ref={ref}
          type='file'
          multiple={false}
          accept='image/jpeg, image/jpg, image/png, image/webp'
          className='invisible'
          {...rest}
          onChange={(event) => {
            if (temporaryImageUrl) {
              URL.revokeObjectURL(temporaryImageUrl)
            }
            if (event.target.files) {
              const url = URL.createObjectURL(event.target.files[0])
              setTemporaryImageUrl(url)
            }
            const typedRest = rest as UseFormRegisterReturn
            typedRest.onChange(event)
          }}
        />
        {errorMessage && (
          <div className='absolute bottom-[-20px] flex items-center gap-1'>
            <AlertCircleIcon className='text-current' width={14} height={14} />{' '}
            <span className='body-xs'>{errorMessage}</span>
          </div>
        )}
      </label>
    )
  }
)
