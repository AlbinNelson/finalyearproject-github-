'use client'
import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useEffect } from 'react'

// Add this at the top of your file
// This creates a style element with the font imports
const FontLoader = () => {
  useEffect(() => {
    // Check if the font style tag already exists
    if (!document.getElementById('font-loader-style')) {
      const style = document.createElement('style')
      style.id = 'font-loader-style'
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Montserrat:wght@400;500;700&family=Press+Start+2P&family=Lobster&family=Anton&display=swap');
      `
      document.head.appendChild(style)
    }
  }, [])
  
  return null
}

type Props = {
  element: EditorElement
}

const TextComponent = (props: Props) => {
  const { dispatch, state } = useEditor()

  // Function to get proper font family with fallbacks
  const getFontWithFallback = (fontName: string): string => {
    switch(fontName) {
      case 'DM Sans': return "'DM Sans', sans-serif";
      case 'Roboto': return "'Roboto', sans-serif";
      case 'Open Sans': return "'Open Sans', sans-serif";
      case 'Montserrat': return "'Montserrat', sans-serif";
      case 'Press Start 2P': return "'Press Start 2P', cursive";
      case 'Lobster': return "'Lobster', cursive";
      case 'Anton': return "'Anton', sans-serif";
      case 'Times New Roman': return "'Times New Roman', serif";
      case 'Thin Italic': return "'Thin Italic', serif";
      default: return "Arial, sans-serif";
    }
  };

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }
  
  const styles = {
    ...props.element.styles,
    fontFamily: props.element.styles.fontFamily || 'Arial', // Fallback font
  }
  
  const textStyles = {
    fontFamily: getFontWithFallback(styles.fontFamily),
    // Include any other text-specific styles you want to apply
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  return (
    <>
      {/* Include the FontLoader component */}
      <FontLoader />
      
      <div
        style={styles}
        className={clsx(
          'p-[2px] w-full m-[5px] relative text-[16px] transition-all',
          {
            '!border-blue-500':
              state.editor.selectedElement.id === props.element.id,

            '!border-solid': state.editor.selectedElement.id === props.element.id,
            'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
          }
        )}
        onClick={handleOnClickBody}
      >
        {state.editor.selectedElement.id === props.element.id &&
          !state.editor.liveMode && (
            <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
              {state.editor.selectedElement.name}
            </Badge>
          )}
        <span
          style={textStyles}
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => {
            const spanElement = e.target as HTMLSpanElement
            dispatch({
              type: 'UPDATE_ELEMENT',
              payload: {
                elementDetails: {
                  ...props.element,
                  content: {
                    innerText: spanElement.innerText,
                  },
                },
              },
            })
          }}
        >
          {!Array.isArray(props.element.content) &&
            props.element.content.innerText}
        </span>
        {state.editor.selectedElement.id === props.element.id &&
          !state.editor.liveMode && (
            <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
              <Trash
                className="cursor-pointer"
                size={16}
                onClick={handleDeleteElement}
              />
            </div>
          )}
      </div>
    </>
  )
}

export default TextComponent