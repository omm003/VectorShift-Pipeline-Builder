import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './pipeline.css';

function App() {
  return (
    <div className="app-root">
      <PipelineToolbar />
      <main className="app-main">
        <PipelineUI />
      </main>
      <SubmitButton />
    </div>
  );
}

export default App;
