document.addEventListener('DOMContentLoaded', () => {
  // --- DADOS E CONSTANTES ---
  const FOOD_ITEMS = [
    { word: 'Café', flavor: 'Doce', temperature: 'Quente' }, { word: 'Churros', flavor: 'Doce', temperature: 'Quente' },
    { word: 'Bolo', flavor: 'Doce', temperature: 'Quente' }, { word: 'Chá', flavor: 'Doce', temperature: 'Quente' },
    { word: 'Panqueca', flavor: 'Doce', temperature: 'Quente' }, { word: 'Sorvete', flavor: 'Doce', temperature: 'Frio' },
    { word: 'Refrigerante', flavor: 'Doce', temperature: 'Frio' }, { word: 'Pudim', flavor: 'Doce', temperature: 'Frio' },
    { word: 'Suco', flavor: 'Doce', temperature: 'Frio' }, { word: 'Iogurte', flavor: 'Doce', temperature: 'Frio' },
    { word: 'Sopa', flavor: 'Salgado', temperature: 'Quente' }, { word: 'Pizza', flavor: 'Salgado', temperature: 'Quente' },
    { word: 'Batata Frita', flavor: 'Salgado', temperature: 'Quente' }, { word: 'Hambúrguer', flavor: 'Salgado', temperature: 'Quente' },
    { word: 'Macarrão', flavor: 'Salgado', temperature: 'Quente' }, { word: 'Sanduíche', flavor: 'Salgado', temperature: 'Frio' },
    { word: 'Salada', flavor: 'Salgado', temperature: 'Frio' }, { word: 'Sushi', flavor: 'Salgado', temperature: 'Frio' },
    { word: 'Queijo', flavor: 'Salgado', temperature: 'Frio' }, { word: 'Presunto', flavor: 'Salgado', temperature: 'Frio' },
  ];
  const FOOD_MAP = new Map(FOOD_ITEMS.map(item => [item.word, item]));
  const preloadedImages = FOOD_ITEMS.map(({ word }) => {
    const img = new Image();
    img.src = `src/imagens/${encodeURIComponent(word)}.jpg`;
    return img;
  });

  const STAGE_1_DEMO = [ 
    'Café', 'Sushi', 'Bolo', 'Refrigerante', 'Presunto', 'Panqueca', 'Pizza', 'Chá', 'Hambúrguer', 'Sorvete', 
    'Sopa', 'Churros', 'Salada', 'Macarrão', 'Suco', 'Queijo', 'Iogurte', 'Batata Frita', 'Pudim', 'Sanduíche' 
];

const STAGE_2_DEMO = [ 
    'Macarrão', 'Chá', 'Batata Frita', 'Iogurte', 'Pizza', 'Café', 'Sorvete', 'Presunto', 'Sanduíche', 'Sushi', 
    'Bolo', 'Suco', 'Churros', 'Hambúrguer', 'Pudim', 'Refrigerante', 'Sopa', 'Queijo', 'Salada', 'Panqueca' 
];

const STAGE_3_DEMO = [
    { word: 'Queijo', criterion: 'Temperatura', isSwitch: false }, { word: 'Panqueca', criterion: 'Temperatura', isSwitch: false },
    { word: 'Refrigerante', criterion: 'Sabor', isSwitch: true }, { word: 'Sushi', criterion: 'Sabor', isSwitch: false },
    { word: 'Café', criterion: 'Sabor', isSwitch: false }, { word: 'Salada', criterion: 'Temperatura', isSwitch: true },
    { word: 'Churros', criterion: 'Sabor', isSwitch: true }, { word: 'Macarrão', criterion: 'Sabor', isSwitch: false },
    { word: 'Pudim', criterion: 'Temperatura', isSwitch: true }, { word: 'Hambúrguer', criterion: 'Temperatura', isSwitch: false },
    { word: 'Chá', criterion: 'Temperatura', isSwitch: false }, { word: 'Batata Frita', criterion: 'Temperatura', isSwitch: false },
    { word: 'Iogurte', criterion: 'Sabor', isSwitch: true }, { word: 'Sanduíche', criterion: 'Sabor', isSwitch: false },
    { word: 'Sopa', criterion: 'Sabor', isSwitch: false }, { word: 'Presunto', criterion: 'Temperatura', isSwitch: true },
    { word: 'Bolo', criterion: 'Sabor', isSwitch: true }, { word: 'Suco', criterion: 'Sabor', isSwitch: false },
    { word: 'Pizza', criterion: 'Temperatura', isSwitch: true }, { word: 'Sorvete', criterion: 'Temperatura', isSwitch: false }
];

  const STAGE_1_OFFICIAL = [ 'Pudim', 'Sopa', 'Suco', 'Batata Frita', 'Pizza', 'Café', 'Sanduíche', 'Café', 'Panqueca', 'Presunto', 'Queijo', 'Sushi', 'Churros', 'Sushi', 'Sorvete', 'Macarrão', 'Hambúrguer', 'Iogurte', 'Panqueca', 'Sopa', 'Chá', 'Pizza', 'Sanduíche', 'Sorvete', 'Salada', 'Presunto', 'Bolo', 'Refrigerante', 'Salada', 'Iogurte', 'Queijo', 'Suco', 'Hambúrguer', 'Churros', 'Batata Frita', 'Pudim', 'Macarrão', 'Chá', 'Bolo', 'Refrigerante' ];
  const STAGE_2_OFFICIAL = [ 'Café', 'Panqueca', 'Presunto', 'Macarrão', 'Suco', 'Refrigerante', 'Sopa', 'Sushi', 'Macarrão', 'Sushi', 'Presunto', 'Sopa', 'Chá', 'Churros', 'Iogurte', 'Pudim', 'Sanduíche', 'Churros', 'Pudim', 'Sorvete', 'Salada', 'Pizza', 'Batata Frita', 'Iogurte', 'Suco', 'Queijo', 'Bolo', 'Hambúrguer', 'Salada', 'Pizza', 'Batata Frita', 'Café', 'Chá', 'Sanduíche', 'Sorvete', 'Bolo', 'Refrigerante', 'Hambúrguer', 'Queijo', 'Presunto' ];
  const STAGE_3_OFFICIAL = [ { word: 'Churros', criterion: 'Temperatura', isSwitch: false }, { word: 'Batata Frita', criterion: 'Temperatura', isSwitch: false }, { word: 'Hambúrguer', criterion: 'Sabor', isSwitch: true }, { word: 'Pudim', criterion: 'Sabor', isSwitch: false }, { word: 'Sopa', criterion: 'Sabor', isSwitch: false }, { word: 'Bolo', criterion: 'Sabor', isSwitch: false }, { word: 'Chá', criterion: 'Sabor', isSwitch: false }, { word: 'Sanduíche', criterion: 'Sabor', isSwitch: false }, { word: 'Salada', criterion: 'Temperatura', isSwitch: true }, { word: 'Pizza', criterion: 'Sabor', isSwitch: true }, { word: 'Hambúrguer', criterion: 'Sabor', isSwitch: false }, { word: 'Churros', criterion: 'Temperatura', isSwitch: true }, { word: 'Hambúrguer', criterion: 'Temperatura', isSwitch: false }, { word: 'Chá', criterion: 'Sabor', isSwitch: true }, { word: 'Sorvete', criterion: 'Temperatura', isSwitch: true }, { word: 'Iogurte', criterion: 'Temperatura', isSwitch: false }, { word: 'Suco', criterion: 'Sabor', isSwitch: true }, { word: 'Pizza', criterion: 'Sabor', isSwitch: false }, { word: 'Salada', criterion: 'Sabor', isSwitch: false }, { word: 'Chá', criterion: 'Temperatura', isSwitch: true }, { word: 'Salada', criterion: 'Sabor', isSwitch: true }, { word: 'Sorvete', criterion: 'Sabor', isSwitch: false }, { word: 'Bolo', criterion: 'Temperatura', isSwitch: true }, { word: 'Sopa', criterion: 'Temperatura', isSwitch: false }, { word: 'Macarrão', criterion: 'Sabor', isSwitch: true }, { word: 'Sushi', criterion: 'Sabor', isSwitch: false }, { word: 'Macarrão', criterion: 'Temperatura', isSwitch: true }, { word: 'Sopa', criterion: 'Temperatura', isSwitch: false }, { word: 'Panqueca', criterion: 'Temperatura', isSwitch: false }, { word: 'Queijo', criterion: 'Sabor', isSwitch: true }, { word: 'Iogurte', criterion: 'Temperatura', isSwitch: true }, { word: 'Pizza', criterion: 'Temperatura', isSwitch: false }, { word: 'Iogurte', criterion: 'Sabor', isSwitch: true }, { word: 'Café', criterion: 'Sabor', isSwitch: false }, { word: 'Presunto', criterion: 'Temperatura', isSwitch: true }, { word: 'Pudim', criterion: 'Sabor', isSwitch: true }, { word: 'Macarrão', criterion: 'Sabor', isSwitch: false }, { word: 'Presunto', criterion: 'Temperatura', isSwitch: true }, { word: 'Refrigerante', criterion: 'Sabor', isSwitch: true }, { word: 'Sushi', criterion: 'Temperatura', isSwitch: true }, { word: 'Bolo', criterion: 'Temperatura', isSwitch: false }, { word: 'Refrigerante', criterion: 'Temperatura', isSwitch: false }, { word: 'Hambúrguer', criterion: 'Sabor', isSwitch: true }, { word: 'Suco', criterion: 'Temperatura', isSwitch: true }, { word: 'Queijo', criterion: 'Temperatura', isSwitch: false }, { word: 'Sushi', criterion: 'Sabor', isSwitch: true }, { word: 'Pudim', criterion: 'Temperatura', isSwitch: true }, { word: 'Sorvete', criterion: 'Temperatura', isSwitch: false }, { word: 'Iogurte', criterion: 'Sabor', isSwitch: true }, { word: 'Café', criterion: 'Temperatura', isSwitch: true }, { word: 'Hambúrguer', criterion: 'Temperatura', isSwitch: false }, { word: 'Presunto', criterion: 'Sabor', isSwitch: true }, { word: 'Refrigerante', criterion: 'Temperatura', isSwitch: true }, { word: 'Salada', criterion: 'Temperatura', isSwitch: false }, { word: 'Sanduíche', criterion: 'Temperatura', isSwitch: false }, { word: 'Macarrão', criterion: 'Temperatura', isSwitch: false }, { word: 'Sanduíche', criterion: 'Temperatura', isSwitch: false }, { word: 'Panqueca', criterion: 'Sabor', isSwitch: true }, { word: 'Pizza', criterion: 'Temperatura', isSwitch: true }, { word: 'Pudim', criterion: 'Temperatura', isSwitch: false }, { word: 'Queijo', criterion: 'Temperatura', isSwitch: false }, { word: 'Churros', criterion: 'Sabor', isSwitch: true }, { word: 'Panqueca', criterion: 'Temperatura', isSwitch: true }, { word: 'Churros', criterion: 'Sabor', isSwitch: true }, { word: 'Suco', criterion: 'Temperatura', isSwitch: true }, { word: 'Batata Frita', criterion: 'Temperatura', isSwitch: false }, { word: 'Refrigerante', criterion: 'Sabor', isSwitch: true }, { word: 'Queijo', criterion: 'Sabor', isSwitch: false }, { word: 'Panqueca', criterion: 'Sabor', isSwitch: false }, { word: 'Presunto', criterion: 'Sabor', isSwitch: false }, { word: 'Suco', criterion: 'Sabor', isSwitch: false }, { word: 'Sorvete', criterion: 'Sabor', isSwitch: false }, { word: 'Chá', criterion: 'Temperatura', isSwitch: true }, { word: 'Bolo', criterion: 'Sabor', isSwitch: true }, { word: 'Batata Frita', criterion: 'Sabor', isSwitch: false }, { word: 'Sanduíche', criterion: 'Sabor', isSwitch: false }, { word: 'Café', criterion: 'Sabor', isSwitch: false }, { word: 'Sushi', criterion: 'Temperatura', isSwitch: true }, { word: 'Sopa', criterion: 'Sabor', isSwitch: true }, { word: 'Café', criterion: 'Temperatura', isSwitch: true } ];

  // --- VARIÁVEIS DE ESTADO ---
  let gameState = 'INSTRUCTIONS_1';
  let currentTrials = [];
  let currentIndex = 0;
  let stageNumber = 0;
  let pendingStage = null;
  let results = [];
  let stageResults = [];
  let startTime = 0;
  let errorCount = 0;
  let feedbackTimeout;

  // --- ELEMENTOS DO DOM ---
  const screens = {
    'INSTRUCTIONS_1': document.getElementById('instructions-1'),
    'INSTRUCTIONS_2': document.getElementById('instructions-2'),
    'INSTRUCTIONS_3': document.getElementById('instructions-3'),
    'POSITIONING': document.getElementById('positioning-screen'),
    'TEST': document.getElementById('test-screen'),
    'TRANSITION': document.getElementById('transition-screen'),
    'RESULTS': document.getElementById('results-screen')
  };
  const testCueEl = document.getElementById('test-cue');
  const testImageEl = document.getElementById('test-image');
  const testFeedbackEl = document.getElementById('test-feedback');
  const testProgressEl = document.getElementById('test-progress');
  const testKeyAMeaningEl = document.getElementById('test-key-a-meaning');
  const testKeyLMeaningEl = document.getElementById('test-key-l-meaning');
  const transitionKeyAEl = document.getElementById('transition-key-a-text');
  const transitionKeyLEl = document.getElementById('transition-key-l-text');
  const restartButton = document.getElementById('restart-button');

  const KEY_HINTS_BY_STAGE = {
    1: { 
        a: '<span style="color: var(--cyan);">FRIA</span>', 
        l: '<span style="color: var(--amber);">QUENTE</span>' 
    },
    2: { 
        a: '<span style="color: var(--cyan);">DOCE</span>', 
        l: '<span style="color: var(--amber);">SALGADA</span>' 
    },
    3: { 
        a: '<span style="color: var(--cyan);">FRIA<br>ou DOCE</span>', 
        l: '<span style="color: var(--amber);">QUENTE<br>ou SALGADA</span>' 
    },
  };

  // --- FUNÇÕES DE CONTROLE DE TELA ---
  function showScreen(screenKey) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenKey].classList.remove('hidden');
  }

  // --- LÓGICA DO TESTE ---
  function startStage() {
    clearTimeout(feedbackTimeout);
    window.removeEventListener('keydown', handleInstructionKey);

    const stageMap = {
      'INSTRUCTIONS_1': { next: 'STAGE_1_DEMO', stageNum: 1, trials: STAGE_1_DEMO },
      'INSTRUCTIONS_2': { next: 'STAGE_2_DEMO', stageNum: 2, trials: STAGE_2_DEMO },
      'INSTRUCTIONS_3': { next: 'STAGE_3_DEMO', stageNum: 3, trials: STAGE_3_DEMO },
    };

    const config = stageMap[gameState];
    if (!config) return;

    pendingStage = config;
    gameState = 'POSITIONING';
    showScreen('POSITIONING');
    window.addEventListener('keydown', handlePositioningKey);
  }

  function handlePositioningKey(event) {
    if (event.code !== 'Space') return;
    window.removeEventListener('keydown', handlePositioningKey);
    gameState = pendingStage.next;
    stageNumber = pendingStage.stageNum;
    currentTrials = pendingStage.trials;
    currentIndex = 0;
    stageResults = [];
    const hints = KEY_HINTS_BY_STAGE[stageNumber];
    testKeyAMeaningEl.innerHTML = hints.a;
    testKeyLMeaningEl.innerHTML = hints.l;
    showScreen('TEST');
    renderCurrentTrial();
    window.addEventListener('keydown', handleTestKey);
  }

  function renderCurrentTrial() {
    if (currentIndex >= currentTrials.length) {
      endStage();
      return;
    }

    const { word, criterion } = getTrialInfo();
    testCueEl.textContent = criterion === 'Temperatura' ? '🌡️' : '👄';
    testImageEl.src = `src/imagens/${encodeURIComponent(word)}.jpg`;
    testImageEl.alt = word;
    testFeedbackEl.classList.add('hidden');

    const isDemo = gameState.endsWith('_DEMO');
    //testProgressEl.textContent = `${isDemo ? 'Treino' : 'Teste'}: ${currentIndex + 1} / ${currentTrials.length}`; // <-- COMENTADO PARA CONTADOR NÃO APARECER NA TELA

    errorCount = 0;
    startTime = Date.now();
  }

  function getTrialInfo() {
    const currentTrial = currentTrials[currentIndex];
    if (stageNumber < 3) {
      return { word: currentTrial, criterion: stageNumber === 1 ? 'Temperatura' : 'Sabor', isSwitchTrial: undefined };
    }
    return { word: currentTrial.word, criterion: currentTrial.criterion, isSwitchTrial: currentTrial.isSwitch };
  }

  function handleTestKey(event) {
    const key = event.key.toLowerCase();
    if (key !== 'a' && key !== 'l') return;
    
    // Se estiver no castigo visual do erro do treino, ignora os cliques extras
    if (!testFeedbackEl.classList.contains('hidden')) return;

    const { word, criterion, isSwitchTrial } = getTrialInfo();
    const foodItem = FOOD_MAP.get(word);
    if (!foodItem) return;

    let correctKey;
    if (criterion === 'Temperatura') {
        correctKey = foodItem.temperature === 'Frio' ? 'a' : 'l';
    } else {
        correctKey = foodItem.flavor === 'Doce' ? 'a' : 'l';
    }

    const isDemo = gameState.endsWith('_DEMO');
    const reactionTime = Date.now() - startTime;

    // 1. CAPTURA O BOTÃO NA TELA E APLICA O EFEITO DE AFUNDAR (TÁTIL)
    const btn = document.getElementById(`key-${key}`);
    if (btn) btn.classList.add('active-press');

    if (key === correctKey) {
      // --- ACERTO ---
      if (isDemo && btn) btn.classList.add('success');

      stageResults.push({
          trialIndex: currentIndex, stage: stageNumber, word, criterion,
          isSwitchTrial, reactionTime, errorCount, correctKey,
      });

      setTimeout(() => {
          if (btn) btn.classList.remove('active-press', 'success');
          currentIndex++;
          renderCurrentTrial();
      }, 150);

  } else {
      // --- ERRO (Aplicado em Treino e Oficial) ---
      errorCount++;
      
      if (btn) btn.classList.add('fail');
      testFeedbackEl.classList.remove('hidden'); // Mostra o X vermelho
      
      // Remove o efeito vermelho e o X depois de 500ms, mas NÃO avança a etapa
      feedbackTimeout = setTimeout(() => {
          if (btn) btn.classList.remove('active-press', 'fail');
          testFeedbackEl.classList.add('hidden');
      }, 500);
  }
}

  function endStage() {
    window.removeEventListener('keydown', handleTestKey);

    const isDemo = gameState.endsWith('_DEMO');
    if (!isDemo) {
      results.push(...stageResults);
    }

    switch (gameState) {
      case 'STAGE_1_DEMO':
        showTransition(1);
        break;
      case 'STAGE_1':
        gameState = 'INSTRUCTIONS_2';
        showScreen('INSTRUCTIONS_2');
        window.addEventListener('keydown', handleInstructionKey);
        break;
      case 'STAGE_2_DEMO':
        showTransition(2);
        break;
      case 'STAGE_2':
        gameState = 'INSTRUCTIONS_3';
        showScreen('INSTRUCTIONS_3');
        window.addEventListener('keydown', handleInstructionKey);
        break;
      case 'STAGE_3_DEMO':
        showTransition(3);
        break;
      case 'STAGE_3':
        gameState = 'RESULTS';
        showScreen('RESULTS');
        break;
    }
  }

  function showTransition(stageNum) {
    const officialTrials = { 1: STAGE_1_OFFICIAL, 2: STAGE_2_OFFICIAL, 3: STAGE_3_OFFICIAL }[stageNum];
    pendingStage = { next: `STAGE_${stageNum}`, stageNum, trials: officialTrials };
    gameState = 'TRANSITION';

    const hints = KEY_HINTS_BY_STAGE[stageNum];
    transitionKeyAEl.innerHTML = hints.a;
    transitionKeyLEl.innerHTML = hints.l;

    showScreen('TRANSITION');
    window.addEventListener('keydown', handleTransitionKey);
  }

  function handleTransitionKey(event) {
    if (event.code !== 'Space') return;
    window.removeEventListener('keydown', handleTransitionKey);
    gameState = pendingStage.next;
    stageNumber = pendingStage.stageNum;
    currentTrials = pendingStage.trials;
    currentIndex = 0;
    stageResults = [];
    const hints = KEY_HINTS_BY_STAGE[stageNumber];
    testKeyAMeaningEl.innerHTML = hints.a;
    testKeyLMeaningEl.innerHTML = hints.l;
    showScreen('TEST');
    renderCurrentTrial();
    window.addEventListener('keydown', handleTestKey);
  }

  function handleInstructionKey(event) {
    if (event.code === 'Space') {
      startStage();
    }
  }

// Enviar por email - antes era downloadCSV
async function sendResultsByEmail() {
  // 1. Abre uma caixinha pedindo o ID do participante
  let idParticipante = prompt("Por favor, digite o ID ou nome do participante:");
  
  // Se o pesquisador cancelar ou deixar em branco, cria um ID automático
  if (!idParticipante) {
      idParticipante = `Participante-Visual-${Date.now()}`;
  }

  const btn = document.getElementById('download-csv-button');
  btn.disabled = true;
  btn.innerHTML = '⏳ Enviando...';

  const fields = ['indice_trial', 'etapa', 'palavra', 'criterio', 'eh_troca', 'tempo_reacao_ms', 'numero_erros', 'tecla_correta'];
  const rows = results.map((r, i) => [
      i + 1, r.stage, r.word, r.criterion, r.isSwitchTrial === undefined ? '' : (r.isSwitchTrial ? 'sim' : 'nao'),
      r.reactionTime, r.errorCount, r.correctKey
  ]);
  
  const headerRow = ['campo', ...rows.map((_, i) => i + 1)];
  const fieldRows = fields.map((field, fi) => [field, ...rows.map(row => row[fi])]);
  const csvContent = [headerRow, ...fieldRows].map(row => row.join(',')).join('\n');

  try {
    const response = await fetch('/api/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dadosCSV: csvContent,
            participante: idParticipante // <-- 2. Usa o nome que foi digitado na caixinha
        })
    });

      if (response.ok) {
          btn.innerHTML = '✅ Enviado com Sucesso!';
          btn.style.background = 'var(--accent)';
          btn.style.color = '#000';
      } else {
          throw new Error('Erro no servidor');
      }
  } catch (error) {
      console.error("Erro:", error);
      btn.innerHTML = '❌ Erro. Tentar novamente';
      btn.style.background = 'var(--error)';
      btn.disabled = false;
  }
}

// --- BACKUP: COPIAR PARA ÁREA DE TRANSFERÊNCIA ---
function copyToClipboard() {
  const fields = ['indice_trial', 'etapa', 'palavra', 'criterio', 'eh_troca', 'tempo_reacao_ms', 'numero_erros', 'tecla_correta'];
  const rows = results.map((r, i) => [
    i + 1, r.stage, r.word, r.criterion, r.isSwitchTrial === undefined ? '' : (r.isSwitchTrial ? 'sim' : 'nao'),
    r.reactionTime, r.errorCount, r.correctKey
  ]);
  
  let clipText = fields.join('\t') + '\n';
  rows.forEach(row => { clipText += row.join('\t') + '\n'; });
  
  navigator.clipboard.writeText(clipText).then(() => {
      alert("Resultados copiados! Cole (Ctrl+V) no Excel.");
  }).catch(err => {
      alert("Erro ao copiar. Tente baixar o CSV.");
  });
}

// --- INICIALIZAÇÃO E REINÍCIO ---
function init() {
  gameState = 'INSTRUCTIONS_1';
  results = [];
  showScreen('INSTRUCTIONS_1');
  window.addEventListener('keydown', handleInstructionKey);
}

// Conecta os botões corretamente
document.getElementById('download-csv-button').addEventListener('click', sendResultsByEmail);
document.getElementById('copy-bkp-button').addEventListener('click', copyToClipboard);
restartButton.addEventListener('click', init);

// --- SUPORTE A CLIQUE NOS BOTÕES NOVOS ---
document.querySelectorAll('.btn-main').forEach(btn => {
  btn.addEventListener('click', () => {
      // Dispara um evento simulado de "Espaço"
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
  });
});

init();
});