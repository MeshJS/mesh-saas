import { BaseEdge, EdgeProps } from "@xyflow/react";

export const MergeEdgeXLeft = ({
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

export const MergeEdgeXRight = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) => {
  const distanceBeforeMerge = 1 / 5;
  const mergeX = (targetX - sourceX) * distanceBeforeMerge + sourceX;

  const edgePath = `M ${sourceX} ${sourceY} L ${mergeX} ${sourceY} L ${mergeX} ${targetY} L ${targetX} ${targetY}`;

  return <BaseEdge id={id} path={edgePath} />;
};

export const MergeEdgeYTop = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) => {
  const distanceBeforeMerge = 1 / 5;
  const mergeY = (targetY - sourceY) * distanceBeforeMerge + sourceY;

  const edgePath = `M ${sourceX} ${sourceY} L ${sourceX} ${mergeY} L ${targetX} ${mergeY} L ${targetX} ${targetY}`;

  return <BaseEdge id={id} path={edgePath} />;
};

export const MergeEdgeYBottom = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) => {
  const distanceBeforeMerge = 4 / 5;
  const mergeY = (targetY - sourceY) * distanceBeforeMerge + sourceY;

  const edgePath = `M ${sourceX} ${sourceY} L ${sourceX} ${mergeY} L ${targetX} ${mergeY} L ${targetX} ${targetY}`;

  return <BaseEdge id={id} path={edgePath} />;
};
