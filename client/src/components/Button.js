import React from 'react'

function Button({ title, onClick, variant, disabled, fullWidth, rounded, size, type }) {

    let className = 'bg-primary text-white uppercase p-1 font-bold font-expanded'
    if(fullWidth) {
        className += ' w-full'
    }
    if(rounded) {
        className += ' rounded'
    }
    if (size === 'small') {
        className = className.replace('p-1 font-bold font-expanded', ' font-light font-condensed text-shadow-1 button-sm')
    } else if (size === 'medium'){
        className = className.replace('p-1 font-bold font-expanded', ' font-normal text-shadow-1  button-md')
    }

    if(variant === 'outlined'){
        className = className.replace('bg-primary text-white', ' border border-primary text-primary bg-white')
    }
  return (
    <button 
        className={className} 
        type={type}
        onClick={onClick}
        disabled={disabled}
    >
        {title}
    </button>
  )
}

export default Button