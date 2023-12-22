import React  from 'react';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';

const { text } = require('./text')

function renderDiff(delta) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {delta.title}
      </AccordionSummary>
      <AccordionDetails>
        <ReactDiffViewer
          oldValue={delta.removed ?? ''}
          newValue={delta.added ?? ''}
          splitView={false}
          compareMethod={DiffMethod.WORDS}
          codeFoldMessageRenderer={(n) => `Mostrar ${n} líneas más...`}
          hideLineNumbers={true}
          />
      </AccordionDetails>
    </Accordion>
  )
}

function renderArticle(article) {
  return (  
    <div style={{whiteSpace: "pre-wrap"}}>
      {article.text}
      {article.delta && renderDiff(article.delta)}
    </div>
  )
}

function renderBlock(block) {
  if (block.type === 'text') {
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {block.title}
        </AccordionSummary>
        <AccordionDetails>
          <div style={{whiteSpace: "pre-wrap"}}>
            {block.blocks.join('\n')}
          </div>
        </AccordionDetails>
      </Accordion>
    )
  }
  if (block.type === 'block') {
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {block.title}
        </AccordionSummary>
        <AccordionDetails>
          {block.articles.map((a, i) => <div key={i}>{renderArticle(a)}</div>)}
        </AccordionDetails>
      </Accordion>
    )
  }
  return '';
}

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        {text.map((block, i) => <div key={i}>{renderBlock(block)}</div>)}
      </Container>
    </div>
  );
}

export default App;
