#!/usr/bin/perl

use strict;

my $childPid = 0;
my $loop = 3;

while (1)
{
   $childPid = fork ();
   
   if ($childPid == 0)
   {
      system ("./copypgn");
      exit (1);
   }
   else
   {
      sleep(10);
      kill 9, $childPid;
   }
   $loop = $loop - 1;
}
   
