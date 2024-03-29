// https://codesandbox.io/s/00r3qzw9pn?file=/src/modal.js
import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'

const Backdrop = ({ isOpen, children }: any) => {
  const root = document.getElementById('root')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{ height: root?.scrollHeight ? `${root?.scrollHeight}px` : '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="backdrop--outer-wrapper"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop--inner-wrapper"
          >
            <div className="backdrop" />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default Backdrop
