export function validatePercentageStrategy(
    agents: {
      percentage: number;
    }[]
  ) {
    const total = agents.reduce(
      (sum, item) => sum + item.percentage,
      0
    );
  
    return total === 100;
  }