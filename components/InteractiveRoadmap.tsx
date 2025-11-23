import React from 'react';
import { RoadmapPhase } from '../types';
import { PHASES } from '../data';
import { Cpu, GitBranch, BookOpen, Circle } from 'lucide-react';

interface InteractiveRoadmapProps {
  activePhaseId: string;
  onPhaseSelect: (id: string) => void;
}

const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({ activePhaseId, onPhaseSelect }) => {
  // Calculate positions for an SVG layout
  // 3 Phases horizontally centered
  const svgWidth = 1000;
  const svgHeight = 250;
  const padding = 100;
  const nodeY = 80;
  const availableWidth = svgWidth - (padding * 2);
  const spacing = availableWidth / (PHASES.length - 1);

  return (
    <div className="w-full bg-console-900 border border-console-700 rounded-xl shadow-2xl mb-8 relative group overflow-hidden">
       {/* Background Grid Effect */}
       <div className="absolute inset-0 opacity-10" 
            style={{ 
                backgroundImage: 'radial-gradient(#0078D4 1px, transparent 1px)', 
                backgroundSize: '20px 20px' 
            }}>
       </div>

      <svg width="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="relative z-10 block">
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Connecting Lines */}
        <path 
          d={`M ${padding} ${nodeY} L ${svgWidth - padding} ${nodeY}`} 
          stroke="url(#line-gradient)" 
          strokeWidth="6" 
          strokeOpacity="0.2"
        />
        
        {/* Animated Progress Line */}
        <path 
            d={`M ${padding} ${nodeY} L ${svgWidth - padding} ${nodeY}`} 
            stroke="url(#line-gradient)" 
            strokeWidth="3" 
            strokeDasharray="15, 15"
            className="animate-dash"
            style={{ animationDuration: '3s' }}
        />

        {PHASES.map((phase, index) => {
          const x = padding + (index * spacing);
          const isActive = activePhaseId === phase.id;
          
          let Icon = Circle;
          let colorClass = "text-slate-500";
          let strokeColor = "#334155";

          if (phase.id === 'P1') {
             Icon = Cpu;
             colorClass = isActive ? "text-emerald-400" : "text-emerald-800";
             strokeColor = isActive ? "#10b981" : "#064e3b";
          } else if (phase.id === 'P2') {
             Icon = GitBranch;
             colorClass = isActive ? "text-azure-400" : "text-azure-900";
             strokeColor = isActive ? "#3FA9F5" : "#003049";
          } else if (phase.id === 'P3') {
             Icon = BookOpen;
             colorClass = isActive ? "text-purple-400" : "text-purple-900";
             strokeColor = isActive ? "#c084fc" : "#4c1d95";
          }

          return (
            <g key={phase.id} onClick={() => onPhaseSelect(phase.id)} className="cursor-pointer transition-all duration-300">
              {/* Main Node Circle */}
              <circle 
                cx={x} 
                cy={nodeY} 
                r={isActive ? 35 : 25} 
                fill="#0f172a" 
                stroke={strokeColor} 
                strokeWidth={isActive ? 4 : 2}
                filter={isActive ? "url(#neon-glow)" : ""}
                className="transition-all duration-500 ease-out"
              />
              
              {/* Icon */}
              <foreignObject x={x - 12} y={nodeY - 12} width="24" height="24" className="pointer-events-none">
                 <div className={`flex items-center justify-center h-full w-full ${colorClass}`}>
                    <Icon size={24} />
                 </div>
              </foreignObject>

              {/* Text Label - Larger font for readability when scaled down */}
              <text 
                x={x} 
                y={nodeY + 65} 
                textAnchor="middle" 
                fill={isActive ? "white" : "#64748b"} 
                fontSize={isActive ? "14" : "12"}
                className={`font-mono font-bold uppercase tracking-widest ${isActive ? 'animate-pulse' : ''}`}
              >
                {phase.title}
              </text>

              {/* Task Nodes (Visual Decoration) */}
              {isActive && phase.tasks.map((task, tIndex) => {
                 const taskX = x + (tIndex % 2 === 0 ? -50 : 50);
                 const taskY = nodeY + 90 + (tIndex * 25);
                 
                 return (
                   <g key={task.id} className="animate-fadeIn">
                      <line x1={x} y1={nodeY + 50} x2={taskX} y2={taskY} stroke={strokeColor} strokeWidth="1" opacity="0.5" />
                      <circle cx={taskX} cy={taskY} r="5" fill={strokeColor} />
                      <text x={taskX + (tIndex % 2 === 0 ? -12 : 12)} y={taskY + 4} textAnchor={tIndex % 2 === 0 ? "end" : "start"} fill="#94a3b8" fontSize="12" className="font-mono">
                         {task.id}
                      </text>
                   </g>
                 )
              })}
            </g>
          );
        })}
      </svg>
      
      {/* Interactive Hint */}
      <div className="absolute bottom-4 right-4 text-[10px] text-slate-600 font-mono flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-azure-500 animate-ping"></div>
        INTERACTIVE SYSTEM MAP
      </div>
    </div>
  );
};

export default InteractiveRoadmap;