import { BaseEdge, EdgeProps } from "@xyflow/react";

export const MergeEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) => {
  const distanceBeforeMerge = 4 / 5;
  const mergeX = (targetX - sourceX) * distanceBeforeMerge + sourceX;

  const edgePath = `M ${sourceX} ${sourceY} L ${mergeX} ${sourceY} L ${mergeX} ${targetY} L ${targetX} ${targetY}`;

  return <BaseEdge id={id} path={edgePath} />;
};
