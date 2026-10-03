// Single source of truth for everything shown on the site, in both languages.
// Inline emphasis uses **double asterisks**; see <Rich> in components/HomePage.tsx.

export type Lang = 'en' | 'zh';
type Localized<T = string> = Record<Lang, T>;

export const site = {
  url: 'https://jtw-sable.vercel.app',
  name: 'Jingbo Wen',
  nickname: 'Tony',
  email: 'jingbowen46@gmail.com',
  links: {
    github: 'https://github.com/ANTI-Tony',
    scholar: 'https://scholar.google.com/citations?user=iWXqUoEAAAAJ',
    linkedin: 'https://www.linkedin.com/in/tony-wen-170461283/',
    juejin: 'https://juejin.cn/user/4100551259985721',
  },
};

export const sectionIds = ['about', 'research', 'experience', 'projects', 'skills', 'education', 'writing'] as const;
export type SectionId = (typeof sectionIds)[number];

export const ui: Localized<{
  title: string;
  description: string;
  skip: string;
  navLabel: string;
  themeToggle: string;
  sections: Record<SectionId, string>;
  preprint: string;
  scholarNote: string;
  updated: string;
  backToTop: string;
}> = {
  en: {
    title: 'Jingbo Wen (Tony) — LLM Systems',
    description:
      'Jingbo Wen (Tony) builds and studies infrastructure for large language models: inference serving, speculative decoding, distributed training, and compute allocation.',
    skip: 'Skip to content',
    navLabel: 'Sections',
    themeToggle: 'Toggle colour theme',
    sections: {
      about: 'About',
      research: 'Research',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      writing: 'Writing',
    },
    preprint: 'Preprint',
    scholarNote: 'Full list on Google Scholar',
    updated: 'Last updated October 2026',
    backToTop: 'Back to top',
  },
  zh: {
    title: 'Jingbo Wen (Tony) — LLM 系统与基础设施',
    description:
      'Jingbo Wen (Tony)：研究并构建大语言模型的基础设施，方向包括推理服务、投机解码、分布式训练与算力分配。',
    skip: '跳到正文',
    navLabel: '页面导航',
    themeToggle: '切换深色 / 浅色',
    sections: {
      about: '简介',
      research: '研究',
      experience: '经历',
      projects: '项目',
      skills: '技能',
      education: '教育',
      writing: '写作',
    },
    preprint: '预印本',
    scholarNote: '完整列表见 Google Scholar',
    updated: '最后更新于 2026 年 10 月',
    backToTop: '回到顶部',
  },
};

export const about: Localized<{ eyebrow: string; lead: string; bio: string; status: string }> = {
  en: {
    eyebrow: 'LLM Systems · Efficient Inference · Compute Allocation',
    lead: 'I build and study infrastructure for large language models: inference serving, speculative decoding, and distributed training.',
    bio: 'I am completing a B.Eng. (Hons) in Software Engineering at the University of Sydney. Most recently I was an Applied Scientist Intern at Microsoft, working on foundation-model serving; before that, an Agent Engineering Intern at Xiaohongshu (RedNote). My research is on allocating inference compute: consequence-aware reasoning budgets and visual token compression, budget-robust speculative decoding, reward-aware execution gating for agents, and market-aware routing across inference providers.',
    status: 'Open to LLM Engineer / LLM Infrastructure roles.',
  },
  zh: {
    eyebrow: 'LLM 系统 · 高效推理 · 算力分配',
    lead: '我研究并构建大语言模型的基础设施：推理服务、投机解码与分布式训练。',
    bio: '目前在悉尼大学攻读软件工程荣誉学士学位。最近在微软担任 Applied Scientist 实习生，做基础模型的推理服务；此前在小红书担任 Agent 工程实习生。研究方向是推理算力的分配：后果感知的推理预算与视觉 token 压缩、预算鲁棒的投机解码、面向智能体的回报感知执行门控，以及跨推理服务商的市场感知路由。',
    status: '正在寻找 LLM 工程 / LLM 基础设施方向的职位。',
  },
};

export interface Publication {
  title: string;
  // Author order as published on arXiv.
  authors: string[];
  arxiv: string;
  category: string;
  date: Localized;
  summary: Localized;
  code?: string;
}

export const publications: Publication[] = [
  {
    title: 'Not All Errors Are Equal: Consequence-Aware Reasoning Compute Allocation',
    authors: ['Liang He', 'Jingbo Wen', 'Haoyu Wang', 'Ziqi He', 'Yixiong Chen', 'Kangning Cui', 'Xilu Wang'],
    arxiv: '2606.04402',
    category: 'cs.AI',
    date: { en: 'Jun 2026', zh: '2026.06' },
    summary: {
      en: '**22–33%** lower cost-weighted loss than difficulty-aware compute routing on SWE-bench Lite.',
      zh: '在 SWE-bench Lite 上，相比按难度分配算力的路由，代价加权损失降低 **22–33%**。',
    },
  },
  {
    title: 'BudgetDraft: Acceptance-Aware Multi-View Training for Sparse-KV Speculative Decoding',
    authors: ['Liang He', 'Jingbo Wen', 'Qishi Zhan', 'Yixiong Chen', 'Kangning Cui', 'Qizhen Lan', 'Xilu Wang'],
    arxiv: '2606.00144',
    category: 'cs.LG',
    date: { en: 'May 2026', zh: '2026.05' },
    summary: {
      en: 'One budget-robust drafter for sparse KV Cache; **6.55×** end-to-end speedup at 4K context.',
      zh: '一个对预算鲁棒的 drafter 即可适配稀疏 KV Cache；4K 上下文下端到端加速 **6.55×**。',
    },
    code: 'https://github.com/ANTI-Tony/BudgetDraft',
  },
  {
    title: 'Not All Visual Tokens Are Equally Safe to Remove: Consequence-Sensitive Visual Token Compression',
    authors: ['Jingbo Wen', 'Liang He', 'Mingyu Cao', 'Haoyu Wang', 'Minxuan Hu', 'Kangning Cui', 'Xilu Wang'],
    arxiv: '2608.09176',
    category: 'cs.CV',
    date: { en: 'Aug 2026', zh: '2026.08' },
    summary: {
      en: 'High-stakes VLM errors **0.300 → 0.133** at fixed token budget; 38% lower cost-weighted error.',
      zh: '在固定 token 预算下，高风险 VLM 错误率由 **0.300 降至 0.133**；代价加权错误降低 38%。',
    },
  },
  {
    title: 'From Relevance to Execution Utility: Reward-Aware Dynamic Execution Gating for Skill-Based LLM Agents',
    authors: ['Liang He', 'Jingbo Wen', 'Hongyu Gu', 'Hao Li', 'Haoyu Wang', 'Yixiong Chen', 'Kangning Cui', 'Xilu Wang'],
    arxiv: '2608.09168',
    category: 'cs.AI',
    date: { en: 'Aug 2026', zh: '2026.08' },
    summary: {
      en: 'RADEG skips **68%** of agent calls while retaining 61% of total reward.',
      zh: 'RADEG 跳过 **68%** 的 agent 调用，同时保留 61% 的总回报。',
    },
  },
  {
    title: 'You Cannot Pick a Provider From the Price List: Market-Aware Routing for Open-Weight LLM Inference',
    authors: ['Liang He', 'Jingbo Wen', 'Yixiong Chen', 'Yue Yang', 'Qizhen Lan', 'Kangning Cui', 'Xilu Wang'],
    arxiv: '2609.37902',
    category: 'cs.AI',
    date: { en: 'Sep 2026', zh: '2026.09' },
    summary: {
      en: 'Price does not predict quality; measured routing saves **~50%** at matched quality.',
      zh: '价格并不能预测质量；基于实测的路由在同等质量下节省 **约 50%** 的成本。',
    },
  },
];

export interface Entry {
  org: Localized;
  role: Localized;
  team: Localized;
  date: Localized;
  bullets: Localized<string[]>;
}

export const experience: Entry[] = [
  {
    org: { en: 'Microsoft', zh: '微软 Microsoft' },
    role: { en: 'Applied Scientist Intern', zh: 'Applied Scientist 实习生' },
    team: { en: 'Azure community infra', zh: 'Azure community infra' },
    date: { en: 'Jun 2026 – Sep 2026', zh: '2026.06 – 2026.09' },
    bullets: {
      en: [
        'Built a dynamic-batching request scheduler in **Go** for Foundation Model serving (routing, admission control, deadlines), sustaining 2K+ concurrent streams; cut p99 TTFT by **28%** under bursty traffic.',
        'Integrated **EAGLE-3 speculative decoding** into the serving runtime, with per-request KV-cache rollback so batches with unequal acceptance lengths verify in one pass; **1.8×** tokens/s at mean acceptance length 3.6.',
        'Profiled the scheduler-to-GPU path with pprof and Nsight Systems; traced a TPOT regression to per-token scheduler–runtime RPC overhead and removed it with batched streaming, lowering TPOT by **17%**.',
        'Built benchmarking and observability for **TTFT, TPOT, tokens/s, and KV-cache usage** across batch sizes and speculation configs; its load sweeps set the concurrency threshold above which speculation is disabled.',
      ],
      zh: [
        '用 **Go** 为基础模型（Foundation Model）推理服务构建动态批处理请求调度器（路由、准入控制、截止时间），支撑 2K+ 并发流；突发流量下 p99 TTFT 降低 **28%**。',
        '将 **EAGLE-3 投机解码**集成进服务运行时，并实现按请求的 KV-cache 回滚，使接受长度不一的批次可在一次前向中完成验证；平均接受长度 3.6 时 tokens/s 达 **1.8×**。',
        '用 pprof 与 Nsight Systems 剖析调度器到 GPU 的链路；定位到 TPOT 退化源于逐 token 的调度器–运行时 RPC 开销，并以批量流式传输消除，TPOT 降低 **17%**。',
        '搭建覆盖不同批大小与投机配置的基准测试与可观测性体系，监测 **TTFT、TPOT、tokens/s 与 KV-cache 占用**；其负载扫描结果确定了超过即停用投机解码的并发阈值。',
      ],
    },
  },
  {
    org: { en: 'Xiaohongshu (RedNote)', zh: '小红书 Xiaohongshu' },
    role: { en: 'Agent Engineering Intern', zh: 'Agent 工程实习生' },
    team: { en: 'Social Networking Engineering', zh: 'Social Networking Engineering' },
    date: { en: 'Dec 2025 – Mar 2026', zh: '2025.12 – 2026.03' },
    bullets: {
      en: [
        'Designed and developed an internal **Coding Agent** from 0→1, enabling autonomous codebase understanding, multi-file editing, tool use, code execution, and iterative debugging from natural-language instructions.',
        'Built a **0→1 OCR verification pipeline** (extraction, validation, exception handling) for a production mobile app and took it from prototype to launch: **98% verification accuracy**, **21K+ users verified on day one**.',
        'Optimized LLM serving (**vLLM, INT4 quantization, continuous batching**): **+45% QPS**, **−40% cost**.',
        'Built and maintained internal LLM training and evaluation pipelines supporting **SFT / DPO / RLHF** workflows.',
      ],
      zh: [
        '从 0 到 1 设计并开发内部 **Coding Agent**，可根据自然语言指令自主完成代码库理解、多文件编辑、工具调用、代码执行与迭代调试。',
        '为线上移动应用从 0 到 1 搭建 **OCR 核验流水线**（提取、校验、异常处理），并从原型推进到上线：**核验准确率 98%**，**上线首日完成 21K+ 用户核验**。',
        '优化 LLM 推理服务（**vLLM、INT4 量化、连续批处理**）：**QPS +45%**，**成本 −40%**。',
        '搭建并维护内部 LLM 训练与评测流水线，支持 **SFT / DPO / RLHF** 流程。',
      ],
    },
  },
];

export const projects: Entry[] = [
  {
    org: { en: 'Distributed LLM Training & Inference System', zh: '分布式 LLM 训练与推理系统' },
    role: { en: 'Personal project', zh: '个人项目' },
    team: { en: 'LLM Systems / Distributed Computing', zh: 'LLM 系统 / 分布式计算' },
    date: { en: 'Jan 2026 – Present', zh: '2026.01 – 至今' },
    bullets: {
      en: [
        'Implemented a 350M–1.3B GPT-style Transformer from scratch (**GQA, RoPE, SwiGLU, RMSNorm**).',
        'Built **Megatron-style Tensor Parallelism** (Column/RowParallelLinear, VocabParallelEmbedding) and **Pipeline Parallelism** (GPipe / 1F1B scheduling, P2P activation transfer, pipeline bubble analysis).',
        'Integrated **DeepSpeed ZeRO-1/2/3** with CPU Offload into a **3D parallel training stack (TP × PP × DP)**, pre-training a 1.3B model on **4×A100** (TP=2, PP=2) over 1.5B tokens.',
        'Built a **KV Cache inference engine** (Prefill/Decode separation, dynamic batching, O(n) per-step attention).',
        'Wrote custom **CUDA C++ and Triton kernels** (elementwise fusion, reduction, softmax/LayerNorm, tiled matmul) and profiled them against PyTorch native ops with Nsight Compute.',
      ],
      zh: [
        '从零实现 350M–1.3B 参数的 GPT 风格 Transformer（**GQA、RoPE、SwiGLU、RMSNorm**）。',
        '实现 **Megatron 风格的张量并行**（Column/RowParallelLinear、VocabParallelEmbedding）与**流水线并行**（GPipe / 1F1B 调度、P2P 激活传输、pipeline bubble 分析）。',
        '将 **DeepSpeed ZeRO-1/2/3** 与 CPU Offload 集成进 **3D 并行训练栈（TP × PP × DP）**，在 **4×A100**（TP=2，PP=2）上用 1.5B token 预训练 1.3B 模型。',
        '实现 **KV Cache 推理引擎**（Prefill/Decode 分离、动态批处理、每步 O(n) 注意力）。',
        '编写自定义 **CUDA C++ 与 Triton kernel**（逐元素融合、归约、softmax/LayerNorm、分块矩阵乘），并用 Nsight Compute 与 PyTorch 原生算子对比剖析。',
      ],
    },
  },
];

export const skills: { label: Localized; items: string[] }[] = [
  {
    label: { en: 'LLM Training', zh: 'LLM 训练' },
    items: ['LoRA', 'SFT / DPO / RLHF', 'DDP', 'Tensor / Pipeline Parallelism', 'DeepSpeed ZeRO-1/2/3', 'NCCL'],
  },
  {
    label: { en: 'LLM Inference', zh: 'LLM 推理' },
    items: ['KV Cache', 'Paged Attention', 'Speculative Decoding', 'Quantization', 'vLLM', 'TensorRT-LLM'],
  },
  {
    label: { en: 'GPU & Kernel', zh: 'GPU 与 Kernel' },
    items: ['CUDA C++', 'Triton', 'Nsight Compute', 'CUDA Streams / Events'],
  },
  {
    label: { en: 'ML Engineering', zh: 'ML 工程' },
    items: ['PyTorch', 'Go', 'FAISS', 'ChromaDB', 'RAG', 'FastAPI', 'Docker', 'Linux', 'Git'],
  },
];

export const education: Localized<{ school: string; degree: string; date: string; facts: string[] }> = {
  en: {
    school: 'University of Sydney',
    degree: 'B.Eng. (Hons), Software Engineering (ECE)',
    date: 'Mar 2023 – Mar 2027 (expected)',
    facts: ['GPA 3.8 / 4.0', '2025 Dean’s List', 'TOEFL iBT 110 / 120 (5.5 / 6)'],
  },
  zh: {
    school: '悉尼大学 University of Sydney',
    degree: '软件工程荣誉学士 · B.Eng. (Hons), Software Engineering (ECE)',
    date: '2023.03 – 2027.03（预计）',
    facts: ['GPA 3.8 / 4.0', '2025 Dean’s List', 'TOEFL iBT 110 / 120（5.5 / 6）'],
  },
};

export const writing: Localized<{ text: string; cta: string }> = {
  en: {
    text: 'I write 拆解大模型 (“Taking LLMs Apart”), a series in Chinese on Juejin about how large language models work: language modeling, Transformer internals, attention, and training.',
    cta: 'Read on Juejin',
  },
  zh: {
    text: '在掘金连载《拆解大模型》系列，讲大语言模型到底是怎么工作的：语言建模、Transformer 内部机制、Attention 与训练。',
    cta: '前往掘金阅读',
  },
};
