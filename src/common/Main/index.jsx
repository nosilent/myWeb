import axios from 'axios'
import { useEffect,useState,useRef } from 'react'
import marked from 'marked'
import prism from 'prismjs'
let list = []
let n = 0
const renderer = {
	heading(text, level) {
		n++
		list.push(<p className={`h${level}`} key={n} data-a={`a${n}`} dangerouslySetInnerHTML={{__html: text}}></p>)
    return `
            <h${level} class='ant-typography a${n}'>
              ${text}
            </h${level}>`
	},
	table(header, body){
		return `<div class='ant-table-wrapper'>
				<div class='ant-table mb20'>
					<div class="ant-table-container">
						<div class="ant-table-content">
							<table style='table-layout: auto;'>
								<thead class="ant-table-thead">
									${header}
								</thead>
								<tbody class="ant-table-tbody">
									${body}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>`
	},
	tablerow(content){
		return `<tr class="ant-table-row ant-table-row-level-0">${content}</tr>`
	},
	tablecell(content,flag){
		let type = flag.header ? 'th': 'td'
		return `<${type} class='ant-table-cell'>${content}</${type}>`
	},
	paragraph(content){
		return `<p class='ant-typography'>${content}</p>`
	}
}
marked.use({ renderer })

function Main(props){
	const [content,setContent] = useState('')
	const contentNodes = useRef()
	useEffect(()=>{
		axios.get(`${props.location.pathname}.md`).then(res=>{
			list = []
			n = 0
			props.initLocation()
			let content = marked(res.data)
			setContent(content)
			props.setMenu(list)
			prism.highlightAll()
		}).catch(err=>{
			props.setMenu([])
			props.history.push('/404')
		})
	},[props.location.pathname])
	
	return  <div dangerouslySetInnerHTML={{__html: content}} className='text' ref={contentNodes}></div>
}

export default Main