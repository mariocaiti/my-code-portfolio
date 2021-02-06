#!/usr/bin/perl

use Tk;

my $total='0';
sub evaltotal
{
    my $result;
    $result=eval($total);
    if($@) {$total=$@;}
    else    {$total=$result;}
}
sub clear
{
    $total='';
}
sub insert
{
     $total.=$_[0];   
}
sub calctestUI
{
    my($root)=@_;
    #declare the UI
    my $total=$root->Entry(-textvariable=>\$total,);
    my $button1=$root->    Button(-text=>'1',);
    my $button2=$root->    Button(-text=>'2',);
    my $button3=$root->    Button(-text=>'3',);
    my $button4=$root->    Button(-text=>'4',);
    my $button5=$root->    Button(-text=>'5',);
    my $button6=$root->    Button(-text=>'6',);
    my $button7=$root->    Button(-text=>'7',);
    my $button8=$root->    Button(-text=>'8',);
    my $button9=$root->    Button(-text=>'9',);
    my $buttonzero=$root->            Button(-text=>'0',);
    my $buttonplus=$root->            Button(-text=>'+',);
    my $buttonminus=$root->        Button(-text=>'-',);
    my $buttontimes=$root->        Button(-text=>'*',);
    my $buttondiv=$root->            Button(-text=>'/',);
    my $buttonpt=$root->                Button(-text=>'.',);
    my $buttoneq=$root->        Button(-text=>'=',);
    #functional subs
    $button1->configure(        -command=>sub{insert '1';});
    $button2->configure(        -command=>sub{insert '2';});
    $button3->configure(        -command=>sub{insert '3';});
    $button4->configure(        -command=>sub{insert '4';});
    $button5->configure(        -command=>sub{insert '5';});
    $button6->configure(        -command=>sub{insert '6';});
    $button7->configure(        -command=>sub{insert '7';});
    $button8->configure(        -command=>sub{insert '8';});
    $button9->configure(        -command=>sub{insert '9';});
    $buttonzero->configure(    -command=>sub{insert '0';});
    $buttonplus->configure(    -command=>sub{insert '+';});
    $buttonminus->configure(    -command=>sub{insert '-';});
    $buttontimes->configure(    -command=>sub{insert '*';});
    $buttondiv->configure(    -command=>sub{insert '/';});
    $buttonpt->configure(    -command=>sub{insert '.';});
    $buttoneq->configure(    -command=>\&evaltotal);
    #organize the window
    $total->grid(-in=>$root, -column=>'1', -row=>'1', -columnspan=>'5');
    $button1->grid(-in=>$root, -column=>'1', -row=>'2');
    $button2->grid(-in=>$root, -column=>'2', -row=>'2');
    $button3->grid(-in=>$root, -column=>'3', -row=>'2');
    $button4->grid(-in=>$root, -column=>'4', -row=>'2');
    $button5->grid(-in=>$root, -column=>'5', -row=>'2');
    $button6->grid(-in=>$root, -column=>'1', -row=>'3');
    $button7->grid(-in=>$root, -column=>'2', -row=>'3');
    $button8->grid(-in=>$root, -column=>'3', -row=>'3');
    $button9->grid(-in=>$root, -column=>'4', -row=>'3');
    $buttonzero->grid(-in=>$root, -column=>'5', -row=>'3');
    $buttonplus->grid(-in=>$root, -column=>'1', -row=>'4');
    $buttonminus->grid(-in=>$root, -column=>'2', -row=>'4');
    $buttontimes->grid(-in=>$root, -column=>'3', -row=>'4');
    $buttondiv->grid(-in=>$root, -column=>'4', -row=>'4');
    $buttonpt->grid(-in=>$root, -column=>'6', -row=>'3');
    $buttoneq->grid(-in=>$root, -column=>'5', -row=>'4');
    #construct the window 4 by 6
    $root->gridRowconfigure(1, -weight=>0, -minsize=>30);
    $root->gridRowconfigure(2, -weight=>0, -minsize=>18);
    $root->gridRowconfigure(3, -weight=>0, -minsize=>10);
    $root->gridRowconfigure(4, -weight=>0, -minsize=>5);
    $root->gridColumnconfigure(1, -weight=>0, -minsize=>2);
    $root->gridColumnconfigure(2, -weight=>0, -minsize=>10);
    $root->gridColumnconfigure(3, -weight=>0, -minsize=>10);
    $root->gridColumnconfigure(4, -weight=>0, -minsize=>20);
    $root->gridColumnconfigure(5, -weight=>0, -minsize=>27);
    $root->gridColumnconfigure(6, -weight=>0, -minsize=>35);
} 
$main=MainWindow->new();
$main->title("A Calculator in perl/tk by Mario Caiti");
calctestUI($main);
MainLoop();