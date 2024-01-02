import React, { useState } from 'react'

const DragDrop = () => {
  const [list1, setList1] = useState(['Item A', 'Item B', 'Item C'])
  const [list2, setList2] = useState([
    {
      question: (
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      ),
      answer: '',
    },
    {
      question: (
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      ),
      answer: '',
    },
    {
      question: (
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      ),
      answer: '',
    },
    {
      question: (
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      ),
      answer: '',
    },
  ])

  const onDragStart = (event, sourceList, sourceIndex) => {
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ sourceList, sourceIndex }),
    )
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDrop = (event, targetList, targetIndex) => {
    const data = JSON.parse(event.dataTransfer.getData('text/plain'))
    const { sourceList, sourceIndex } = data

    if (sourceList === 'list1') {
      const [draggedItem] = list1.splice(sourceIndex, 1)
      const newTargetItems = [...list2]

      if (!newTargetItems[targetIndex].answer) {
        newTargetItems[targetIndex].answer = draggedItem
      } else {
        list1.push(newTargetItems[targetIndex].answer)
        newTargetItems[targetIndex].answer = draggedItem
      }

      setList1([...list1])
      setList2(newTargetItems)
    } else if (sourceList === 'list2' && targetList === 'list2') {
      const temp = list2[sourceIndex].answer
      list2[sourceIndex].answer = list2[targetIndex].answer
      list2[targetIndex].answer = temp
      setList2([...list2])
    } else if (sourceList === 'list2' && targetList === 'list1') {
      const newTargetItems = [...list2]
      const newSourceItems = [...list1]

      if (newTargetItems[sourceIndex].answer) {
        newSourceItems.push(newTargetItems[sourceIndex].answer)
        newTargetItems[sourceIndex].answer = ''
        setList1(newSourceItems)
        setList2([...newTargetItems])
      }
    }
  }

  return (
    <div>
      <h3>Drag and drop the answers into their cards</h3>

      <div
        className="flex bg-bgNeutral w-62 h-36 mt-10 mx-12 rounded-xl justify-center items-center mb-12"
        onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => onDrop(event, 'list1', null)}
      >
        {list1.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black m-5 p-2 justify-center items-center rounded-sm"
            draggable
            onDragStart={(event) => onDragStart(event, 'list1', index)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <div
          className="w-full h-44 flex rounded-xl items-center"
          onDragOver={onDragOver}
        >
          {list2.map((item, index) => (
            <div
              key={index}
              className=" m-2 w-full h-28 justify-center items-center flex flex-col rounded-xl"
              onDragOver={(event) => onDragOver(event)}
              onDrop={(event) => onDrop(event, 'list2', index)}
              onDragStart={(event) => onDragStart(event, 'list2', index)}
            >
              {item.question}
              <div>
                <div
                  className="bg-white text-black h-8 w-32 mt-4 p-2 rounded-sm flex justify-center items-center"
                  draggable
                >
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DragDrop
