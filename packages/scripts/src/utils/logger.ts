import ora from "ora";
import kleur from "kleur";

export const intro = (message: string) => {
  console.log(kleur.bold().cyan(`[recipe-scripts] ${message}`));
};

export const outro = (message: string) => {
  console.log(kleur.bold().green(`[recipe-scripts] ${message}`));
};

export const spinner = () => ora({ color: "cyan" });
