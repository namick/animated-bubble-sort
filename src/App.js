import React from 'react'
import Box from '@material-ui/core/Box'
import useInterval from 'use-interval'
import swap from 'lodash-move'
import shuffle from 'lodash/shuffle'
import { useTransition, animated } from 'react-spring'
import Button from '@material-ui/core/Button'

const data = () =>
  Array.from(Array(12), () => ({ number: Math.floor(Math.random() * 99) + 1 }))

const AnimatedDonut = animated(Donut)

function App() {
  const [items, setItems] = React.useState(data())
  const [duration, setDuration] = React.useState(null)
  const next = React.useRef(true)
  const pointer = React.useRef(0)
  const iteration = React.useRef(items.length - 1)

  const doSwap = () => {
    const leftIndex = pointer.current
    const rightIndex = pointer.current + 1
    if (next.current) {
      setItems(
        items.map((item, index) => {
          if (
            (index === leftIndex || index === rightIndex) &&
            !(pointer.current >= iteration.current)
          ) {
            item.color = 'secondary.light'
            item.border = 2
          } else {
            item.color = 'primary.main'
            item.border = 1
          }
          return item
        }),
      )
    } else {
      if (items[leftIndex].number > items[rightIndex].number) {
        setItems(items => swap(items, leftIndex, rightIndex))
      }
      pointer.current += 1
      if (pointer.current >= iteration.current) {
        if (iteration.current > 0) {
          pointer.current = 0
          iteration.current -= 1
        } else {
          pointer.current = 0
          iteration.current = items.length - 1
          setDuration(null)
        }
      }
    }
    next.current = !next.current
  }

  useInterval(doSwap, duration)

  let w = 0
  items.forEach(item => {
    item.x = w
    w += 50
  })
  const transitions = useTransition(items, {
    enter: ({ x }) => ({ x }),
    update: ({ x }) => ({ x }),
  })

  const handleGo = () => {
    duration ? setDuration(null) : setDuration(150)
  }

  const handleShuffle = () => {
    setItems(items => shuffle(items))
  }

  return (
    <>
      <Box
        position="relative"
        justifyContent="space-around"
        alignItems="center"
        height={82}
        border={1}
        margin={2}
        borderRadius="borderRadius"
      >
        {transitions((style, item) => (
          <AnimatedDonut
            style={{
              ...style,
              top: '50%',
              marginTop: '-32px',
              position: 'absolute',
            }}
          >
            <Item item={item} count={items.length} />
          </AnimatedDonut>
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <Box marginX={2}>
          <Button variant="outlined" color="primary" onClick={handleGo}>
            Go
          </Button>
        </Box>
        <Button variant="outlined" color="primary" onClick={handleShuffle}>
          Shuffle
        </Button>
      </Box>
    </>
  )
}

function Donut({ style, children }) {
  return <Box style={style}>{children}</Box>
}

function Item({ item, index, count }) {
  return (
    <Box
      margin={2}
      width={34}
      height={34}
      bgcolor="background.paper"
      color="primary.main"
      borderColor={item.color || 'primary.main'}
      border={item.border || 1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="borderRadius"
    >
      <Box>
        <Box>{item.number}</Box>
        {/* <Box>x:{item.x}</Box>
        <Box>key:{item.key}</Box> */}
      </Box>
    </Box>
  )
}

export default App
