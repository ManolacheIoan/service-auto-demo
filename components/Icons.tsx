import { BatteryCharging, CircleDot, ClipboardCheck, Clock, Cog, Crosshair, Disc3, Droplet, FileCheck2, MoveVertical, PackageSearch, ScanSearch, Snowflake, type LucideIcon } from "lucide-react";
import type { Serviciu } from "@/content/site";

export const serviceIcon: Record<Serviciu["icon"], LucideIcon> = {
  diagnoza: ScanSearch, mecanica: Cog, revizie: Droplet, frane: Disc3, suspensie: MoveVertical,
  geometrie: Crosshair, vulcanizare: CircleDot, clima: Snowflake, electrica: BatteryCharging, itp: ClipboardCheck,
};
export const whyIcon: Record<string, LucideIcon> = { scan: ScanSearch, file: FileCheck2, box: PackageSearch, clock: Clock };
