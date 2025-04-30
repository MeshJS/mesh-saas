export const ConnectingEdges = () => {
  return (
    <svg className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible">
      {/* Input connecting lines */}
      {/* From TxHash */}
      <line
        x1="50%"
        y1="50%"
        x2="50%"
        y2="-10%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Main */}
      <line
        x1="-10%"
        y1="-10%"
        x2="110%"
        y2="-10%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Handle (Left) */}
      <line
        x1="-10%"
        y1="-20%"
        x2="-10%"
        y2="-10%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Handle (Right) */}
      <line
        x1="110%"
        y1="-20%"
        x2="110%"
        y2="-10%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Output connecting lines */}
      {/* From TxHash */}
      <line
        x1="50%"
        y1="50%"
        x2="50%"
        y2="110%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Main */}
      <line
        x1="-10%"
        y1="110%"
        x2="110%"
        y2="110%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Handle (Left) */}
      <line
        x1="-10%"
        y1="110%"
        x2="-10%"
        y2="120%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Handle (Right) */}
      <line
        x1="110%"
        y1="110%"
        x2="110%"
        y2="120%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Left Options connecting lines */}
      {/* From TxHash */}
      <line x1="5%" y1="50%" x2="50%" y2="50%" stroke="gray" strokeWidth="2" />

      {/* Main */}
      <line x1="5%" y1="20%" x2="5%" y2="80%" stroke="gray" strokeWidth="2" />

      {/* Handle (Top) */}
      <line x1="5%" y1="20%" x2="0%" y2="20%" stroke="gray" strokeWidth="2" />

      {/* Handle (Bottom) */}
      <line x1="5%" y1="80%" x2="0%" y2="80%" stroke="gray" strokeWidth="2" />

      {/* Right Options connecting lines */}
      {/* From TxHash */}
      <line x1="95%" y1="50%" x2="50%" y2="50%" stroke="gray" strokeWidth="2" />

      {/* Main */}
      <line x1="95%" y1="20%" x2="95%" y2="80%" stroke="gray" strokeWidth="2" />

      {/* Handle (Top) */}
      <line
        x1="95%"
        y1="20%"
        x2="100%"
        y2="20%"
        stroke="gray"
        strokeWidth="2"
      />

      {/* Handle (Bottom) */}
      <line
        x1="95%"
        y1="80%"
        x2="100%"
        y2="80%"
        stroke="gray"
        strokeWidth="2"
      />
    </svg>
  );
};
