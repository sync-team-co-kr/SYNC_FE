import React from 'react';

import { vars } from 'token';

export interface TypographyProps {
  children: React.ReactNode;
  variant: keyof typeof vars.sementic.typography;
  color: keyof typeof vars.sementic.color;
}
