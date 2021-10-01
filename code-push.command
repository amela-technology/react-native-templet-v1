echo 'Target Binary Version:'
read targetBinaryVersion

echo 'Description:'
read description

echo 'Target Environment: \n- 1: Development \n- 2: Staging \n- 3: Production \n(Default: Development)'
read targetEnvironment

echo 'Required Update (y/n - default: yes):'
read mandatory

echo 'Target Binary Version: '$targetBinaryVersion
echo 'Description: '$description

if [[ "$targetEnvironment" == "1" || "$targetEnvironment" == "" ]]; then echo 'Target Environment: Development'
elif [ "$targetEnvironment" == "2" ]; then echo 'Target Environment: Staging'
elif [ "$targetEnvironment" == "3" ]; then echo 'Target Environment: Production'
else echo 'Target Environment: Syntax error'
fi

if [[ "$mandatory" == "y" || "$mandatory" == "" ]]; then echo 'Required Update: Yes'
elif [ "$mandatory" == "n" ]; then echo 'Required Update: No'
else echo 'Required Update: Syntax error'
fi

if [[ "$targetEnvironment" == "1" || "$targetEnvironment" == "" ]]; then
    if [[ "$mandatory" == "y" || "$mandatory" == "" ]]; then
        appcenter codepush release-react -a Project-ios-name -d Env-dev-name -m --description "$description" -t "$targetBinaryVersion"
        appcenter codepush release-react -a Project-android-name -d Env-dev-name -m --description "$description" -t "$targetBinaryVersion"
    elif [ "$mandatory" == "n" ]; then
        appcenter codepush release-react -a Project-ios-name -d Env-dev-name --description "$description" -t "$targetBinaryVersion"
        appcenter codepush release-react -a Project-android-name -d Env-dev-name --description "$description" -t "$targetBinaryVersion"
    else
        echo 'Syntax error'
    fi
elif [ "$targetEnvironment" == "2" ]; then
    if [[ "$mandatory" == "y" || "$mandatory" == "" ]]; then
        appcenter codepush release-react -a Project-ios-name -d Env-staging-name -m --description "$description" -t "$targetBinaryVersion"
        appcenter codepush release-react -a Project-android-name -d Env-staging-name -m --description "$description" -t "$targetBinaryVersion"
    elif [ "$mandatory" == "n" ]; then
        appcenter codepush release-react -a Project-ios-name -d Env-staging-name --description "$description" -t "$targetBinaryVersion"
        appcenter codepush release-react -a Project-android-name -d Env-staging-name --description "$description" -t "$targetBinaryVersion"
    else
        echo 'Syntax error'
    fi
elif [ "$targetEnvironment" == "3" ]; then
    if [[ "$mandatory" == "y" || "$mandatory" == "" ]]; then
        appcenter codepush release-react -a Project-ios-name -d Env-prod-name -m --description "$description" -t "$targetBinaryVersion"
        appcenter codepush release-react -a  Project-android-name -d Env-prod-name -m --description "$description" -t "$targetBinaryVersion"
    elif [ "$mandatory" == "n" ]; then
        appcenter codepush release-react -a Project-ios-name -d Env-prod-name --description "$description" -t "$targetBinaryVersion"
        appcenter codepush release-react -a Project-android-name -d Env-prod-name --description "$description" -t "$targetBinaryVersion"
    else
        echo 'Syntax error'
    fi
else
    echo 'Syntax error'
fi
