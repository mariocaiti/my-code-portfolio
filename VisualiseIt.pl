#!/usr/bin/perl -w
##############################################################################
#    VisualiseIt .02, copyright 2002 by Mario A Caiti    All rights reserved
#  
#    Very big thanks to the Authors of the below Modules, who made my work so much easier!
##############################################################################

use Tk; 
use Tk::DialogBox;
use GD;
use GD::Graph::bars;

$file_affirm="MyAffirmations.txt";    #these should be modifiable by the user
$file_goals="MyGoals.txt";               #paid upgrade option: rewrite for Excel/SQL connectivity

##############################################################################
#    what this function does:   launches the GUI!
#    where the data flows:      via MainLoop. Subs &new_affirm, &lose_affirm, &new_goal, &make_goal are activated 
#    by the approprialte buttons. 
#    important variables defined:    TODO: Labels $C_Therm and $S_Therm have to be written as a GD::Graph Bars. 
#    $Stage_Left has to also accomodate a Canvas that will show our GF file i.e. %Goals
#    as a GD::Graph linear. And it should all fit in a dynamic sizable Canvas. Ouch!
##############################################################################
sub launchUI
{
   	my($features)=@_;   
    my $n;   
   #our logo will also be in this window. The affirmations and goals will be split in two Frames
    $stageRight=$features->Frame(-background=>'#ffdead')->pack(-side=>"left", -expand=>'xy', -fill=>'both');
    $stageLeft=$features->Frame->pack(-side=>"right", -expand=>'xy', -fill=>'both');   
    my $addAfrmButton=$features->Button(-text=>'Add Affirmation', -command=>\&getAfrm); 
   	my $addGoalButn=$features->Button(-text=>'Add Goal', -command=>\&getGoal); 
    $addAfrmButton->grid(-in=>$stageRight, -column=>'1', -row=>'1');   
    $addGoalButn->grid(-in=>$stageLeft, -column=>'1', -row=>'1');
    #and add to mainstage
        
    #    $afrmList->grid(-in=>$stageRight, -column=>'1', -row=>'2');
   #write goals here using stack_goals function
    #
    open GF, "$file_goals" || die;
    @goals=<GF>; 
    close(GF); 
    $stage=$main->Canvas(-width=>200, -height=>300);
    $maxGoal=100;    $goal_arrSize=100;
    foreach (@goals)
    {
        my($goal_txt, $goal_amt)=split '\n', @goals;
     	# $maxGoal=$goal_amt if ($goal_amt gt $maxGoal);
      # $goal_arrSize=$goal_amt;
      #Use of uninitialized value in string gt (>) at myPerl\VisualiseIt.pl line 49.
        $stage->createText($goal_arrSize, $maxGoal, -text=>"test");
        $main->update;    #  Use of uninitialized value in division (/) twice at myPerl\VisualiseIt.pl line 52.
    #    Illegal division by zero at myPerl\VisualiseIt.pl line 52.
    }
   #checking and savings thermometers go down here
   #our bank accounts bar graph
        @accts=(["checking","savings"],[6,21]);
        $acct_compare=GD::Graph::bars->new(100,100);
   # Can't locate object method "new" via package "GD::Graph::bars" 

        $acct_compare->set(bar_spacing=>7, show_values=>1) or warn $acct_compare->error();
        $myAccts=$acct_compare->plot(\@accts) or warn $acct_compare->error(); 
    #and add to mainstage        
    # we want to add BarGraph $acct_compare to Canvas $stage
        $acctGraph=$stage->createWindow(90, 90, -window=>$myAccts);
}
    ######################################
    #    what this does:        Dialog Box adds an affirmation (string in TextBox $getNewAfrm)
    #  
    #    important variables defined:        TextBox $getNewAfrm   
    ######################################
sub getAfrm
{     
        my $prompt=$main->DialogBox(
            -title=>"Say it", 
            -buttons=>["Close the Window"]);
        $getNewAfrm=$prompt->add(
              'Text',
              -height=>'5',
              -width=>'30')->grid(-row=>1,-column=>0, -columnspan=>2);
   #paid upgrade option: rewrite below for Excel/SQL connectivity
        $my_save=$prompt->add(
            Button, 
            -text=>'Save', 
            -command =>\&writeAfrm)->grid(-row=>2,-column=>0, -columnspan=>1);  
        $prompt->Show();
}
sub writeAfrm
{
   #write the affirmations here, reading from a stored .txt file
        open TXTF, "$file_affirm" || die;
        $affirm=<TXTF>;    
        close(TXTF);
        my $new_affirm=$getNewAfrm->get("1.0", "end");
        if($affirm eq '')    #need to rewrite: if file is empty, this is all that goes in
        {    
            $affirm="What do you really want?";          
        }    #ifs MUST be bracketed even for one line in perl
        else
        {
           $affirm .= "$new_affirm\n";
        }    #and basically save it
        open TXTO, ">$file_affirm" || die;
        print TXTO <<EOF;
$affirm
EOF
        close(TXTO);
        $prompt;
}
    #####################################
    #    what this does:    Dialog Box that writes a hashed financial goal (float $num, string $desc) into a .dat file GF
    # 
    #    important variables defined:    TextEntry $numNewGoal marked by Label $tag, TextBox $descNewGoal. 
    ##################################### 
sub getGoal 
{
            my $n_prompt=$main->DialogBox(
              -title=>"Add a \$ value and explanation",
              -buttons=>["Close The Window"]);
            $n_prompt->add('Label',-text=>"\$")
                ->grid(-sticky=>'e',-row=>0, -column=>0);
            $numNewGoal =$n_prompt->add('Entry')
                ->grid(-sticky=>'ew',-row=>0, -column=>1);
            $descNewGoal = $n_prompt->add('Entry')
                ->grid(-row=>1,-column=>0, -columnspan=>2);
            $my_Nsave=$n_prompt->add(Button, -text=>'Save', -command=>\&writeGoal)
                ->grid(-row=>2,-column=>0, -columnspan=>1);
            $n_prompt->Show();
                #this isn't working
            #Tk::Error: wrong # args: should be ".dialogbox1.top.entry1 get"
}
sub writeGoal
{
   #write the affirmations here, reading from a stored .txt file
        open TXTF, "$file_goals" || die;
        $goal=<TXTF>;
        close(TXTF);
        my $num=$numNewGoal->get;
        my $desc=$descNewGoal->get;
        if($goal eq '')   
        {    
            $goal="What You Want\tWhat It Will Cost\n";          
        }    #ifs MUST be bracketed even for one line in perl
        else
        {
           $goal .= "$num\t$desc\n";
        }    #rewrite to add joined variables into database?
        open TXTO, ">$file_goals" || die;
        print TXTO <<EOF;
$goal
EOF
        close(TXTO);
}
$main=MainWindow->new();
$main->title("VisualiseIt 0.04 by Mario Caiti");
launchUI($main);
MainLoop();
#Unable to load GD object - ???
